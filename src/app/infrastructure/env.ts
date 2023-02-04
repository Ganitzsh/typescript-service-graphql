import dotenv from 'dotenv';

dotenv.config();

export type Environment = 'development' | 'production' | 'test';
export type LogLevel = 'info' | 'warn' | 'debug' | 'trace' | 'error';

export const environment = process.env.ENV as Environment;

export const isProduction: boolean = environment === 'production';
export const isDevelopment: boolean = environment === 'development';
export const isTest: boolean = environment === 'test';

export const logLevel = process.env.LOG_LEVEL as LogLevel;

export const serviceName = process.env.SERVICE_NAME;
export const serviceVersion = process.env.SERVICE_VERSION;

export const gcpProject = process.env.GCP_PROJECT;
