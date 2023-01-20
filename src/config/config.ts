import { LoggerConfiguration } from '../logger';
import * as process from 'process';
import dotenv from 'dotenv';

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';

export const ISDEV = ENV === 'development';

export const APP_ID = 'datadog-reporting-tool';
export const LOG_LEVEL = process.env.APP_LOG_LEVEL || 'info';
export const ERROR_LOG_LEVEL = 'error';

export const LOGGER_CONFIG = <LoggerConfiguration>{
  prettyOut: ISDEV,
  applicationId: APP_ID,
  logLevel: LOG_LEVEL,
  errorLogLevel: ERROR_LOG_LEVEL || 'warn',
};

export const DATADOG_API_KEY = process.env.DATADOG_API_KEY || 'default';
export const DATADOG_APPLICATION_KEY = process.env.DATADOG_APPLICATION_KEY || 'default';
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'default';
export const DATA_DIR = process.env.DATA_DIRECTORY;
export const DATADOG_CUSTOM_QUERY = process.env.DATADOG_CUSTOM_QUERY;

export const SFTP_USERNAME = process.env.SFTP_USERNAME;
export const SFTP_PASSWORD = process.env.SFTP_PASSWORD;
export const SFTP_HOST = process.env.SFTP_HOST;
export const SFTP_PORT = process.env.SFTP_PORT;
export const SFTP_ROOTDIR = process.env.SFTP_ROOTDIR;
