import { createLogger, format, LoggerOptions, transports } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

import * as env from './env';

const loggerOptions: LoggerOptions = {
  level: env.logLevel,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: {
    service: {
      name: env.serviceName,
      version: env.serviceVersion,
      environment: env.environment,
    },
  },
  transports: [new transports.Console()],
};

export const logger = createLogger(loggerOptions);

if (env.isProduction) {
  const gcpLogging = new LoggingWinston();

  logger.add(gcpLogging);
}
