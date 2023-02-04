import { Message } from '@bufbuild/protobuf';
import { MethodDefinition, status } from '@grpc/grpc-js';
import {
  HandlerType,
  sendUnaryData,
  ServerUnaryCall,
} from '@grpc/grpc-js/build/src/server-call';

import { logger } from './logger';
import { tracing } from './tracer';

export class GrpcError {
  code: status;
  details: string;

  constructor(code: status, details: string) {
    this.code = code;
    this.details = details;
  }
}

export const createMethodDefinition = <
  TReq extends Message<TReq>,
  TRes extends Message<TRes>,
>(
  method: string,
  type: HandlerType,
  RequestMessage: {
    fromBinary: (v: Buffer) => TReq;
  },
  ResponseMessage: {
    fromBinary: (v: Buffer) => TRes;
  },
): MethodDefinition<TReq, TRes> => ({
  path: `/v1.Service/${method}`,
  requestStream: type === 'bidi' || type === 'clientStream',
  responseStream: type === 'bidi' || type === 'serverStream',
  requestSerialize: (value: TReq): Buffer => Buffer.from(value.toBinary()),
  requestDeserialize: (value: Buffer): TReq => RequestMessage.fromBinary(value),
  responseSerialize: (value: TRes): Buffer => Buffer.from(value.toBinary()),
  responseDeserialize: (value: Buffer): TRes =>
    ResponseMessage.fromBinary(value),
});

const remapSerializationToProtobufES = <
  TReq extends Message<TReq>,
  TRes extends Message<TRes>,
>(
  methodDefinition: MethodDefinition<TReq, TRes>,
  RequestMessage: {
    fromBinary: (v: Buffer) => TReq;
  },
  ResponseMessage: {
    fromBinary: (v: Buffer) => TRes;
  },
) => {
  methodDefinition.requestSerialize = (value: TReq): Buffer =>
    Buffer.from(value.toBinary());
  methodDefinition.responseSerialize = (value: TRes): Buffer =>
    Buffer.from(value.toBinary());
  methodDefinition.requestDeserialize = (value: Buffer): TReq =>
    RequestMessage.fromBinary(value);
  methodDefinition.responseDeserialize = (value: Buffer): TRes =>
    ResponseMessage.fromBinary(value);
};

export const makeRemapFn =
  <TReq extends Message<TReq>, TRes extends Message<TRes>>(
    RequestMessage: {
      fromBinary: (v: Buffer) => TReq;
    },
    ResponseMessage: {
      fromBinary: (v: Buffer) => TRes;
    },
  ) =>
  (methodDefinition: MethodDefinition<TReq, TRes>) =>
    remapSerializationToProtobufES(
      methodDefinition,
      RequestMessage,
      ResponseMessage,
    );

export const wrapUnaryCallHandler = <TReq, TRes>(
  handler: (input: TReq) => Promise<TRes>,
): ((
  call: ServerUnaryCall<TReq, TRes>,
  callback: sendUnaryData<TRes>,
) => void) => {
  return async (
    call: ServerUnaryCall<TReq, TRes>,
    callback: sendUnaryData<TRes>,
  ) => {
    const now = Date.now();
    const currentSpan = tracing.getCurrentSpan();

    logger.debug('incoming grpc request', {
      traceId: currentSpan.spanContext().traceId,
      path: call.getPath(),
    });

    try {
      const response = await handler(call.request);

      callback(null, response);

      logger.debug('grpc request fulfilled', {
        path: call.getPath(),
        timeElapsedMS: Date.now() - now,
      });
    } catch (error: unknown) {
      if (error instanceof GrpcError) {
        callback(error);
      } else {
        callback({
          code: status.UNKNOWN,
          details: 'an unknown error occurred',
        });
      }

      logger.error('an error occurred', {
        path: call.getPath(),
        error,
        timeElapsedMS: Date.now() - now,
      });
    }
  };
};
