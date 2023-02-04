import opentelemetry, { Span } from '@opentelemetry/api';

import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter';

import * as env from './env';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';

const provider = new NodeTracerProvider();

if (env.isProduction) {
  provider.addSpanProcessor(new SimpleSpanProcessor(new TraceExporter()));
}

if (!env.isProduction) {
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
}

provider.register();

registerInstrumentations({
  instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()],
});

export const tracing: typeof opentelemetry & {
  getCurrentSpan(): Span | undefined;
} = {
  ...opentelemetry,
  getCurrentSpan: (): Span | undefined =>
    tracing.trace.getSpan(tracing.context.active()),
};
export const tracer = opentelemetry.trace.getTracer(
  `${env.serviceName}-tracer`,
);
