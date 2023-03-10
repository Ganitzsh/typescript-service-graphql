import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createTerminus } from '@godaddy/terminus';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { logger } from '../infrastructure/logger';

import typeDefs from './schema';
import resolvers from './resolvers';
import { Context } from './context';
import { tracing } from '../infrastructure/tracer';

const onSignal = async (): Promise<void> => {
  logger.debug('server is starting cleanup');
};

const onHealthCheck = async (): Promise<void> => {
  logger.debug('healthcheck ok');
};

export const listen = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  createTerminus(httpServer, {
    signal: 'SIGINT',
    healthChecks: { '/healthcheck': onHealthCheck },
    onSignal,
    useExit0: true,
  });

  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: '50mb' }),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        traceId: tracing.getCurrentSpan().spanContext()?.traceId,
        token: req.headers.token as string,
      }),
    }),
  );

  const port = process.env.PORT || 4000;
  const host = process.env.HOST || '0.0.0.0';

  await new Promise<void>((resolve) =>
    httpServer.listen({ port, host }, resolve),
  );

  logger.info(`Server ready at 0.0.0.0:${port}`);
};
