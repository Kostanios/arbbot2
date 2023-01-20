import PrettyStream from 'bunyan-prettystream';
import Logger, { createLogger, LogLevelString } from 'bunyan';
import { LoggerConfiguration, TErrorLogLevel, TLogLevel } from './types';

function createCustomLogger(stdOutLogger: Logger, stdErrLogger: Logger, removeHostname = true): Logger {
  return {
    trace: stdOutLogger.trace.bind(stdOutLogger),
    debug: stdOutLogger.debug.bind(stdOutLogger),
    info: stdOutLogger.info.bind(stdOutLogger),
    warn: stdOutLogger.warn.bind(stdOutLogger),
    error: stdErrLogger.error.bind(stdErrLogger),
    fatal: stdErrLogger.fatal.bind(stdErrLogger),
    child(options: any, simple?: boolean): Logger {
      const childStdOut = stdOutLogger.child(options, simple);
      const childStdErr = stdErrLogger.child(options, simple);
      if (removeHostname) {
        delete childStdOut.fields.hostname;
        delete childStdErr.fields.hostname;
      }

      return createCustomLogger(childStdOut, childStdErr, removeHostname);
    },
  } as Logger;
}

export function getLogger(options?: LoggerConfiguration) {
  const defaultOptions: LoggerConfiguration = {
    prettyOut: false,
    applicationId: 'app',
    logLevel: 'info',
    errorLogLevel: 'error',
    removeHostname: true,
  };

  const opts = { ...defaultOptions, ...(options || {}) };
  const { prettyOut, applicationId, logLevel, errorLogLevel } = opts;

  if (prettyOut) {
    const prettyStdOut = new PrettyStream();
    prettyStdOut.pipe(process.stdout);

    return createLogger({
      name: applicationId,
      streams: [...[{ type: 'raw', stream: prettyStdOut, level: <LogLevelString>logLevel }], ...(opts.streams || [])],
      serializers: opts.serializers || undefined,
    });
  }

  // create two loggers for stdout and stderr
  const stdOutLogger = createLogger({
    name: applicationId,
    streams: opts.streams || [{ stream: process.stdout, level: <LogLevelString>logLevel }],
    serializers: opts.serializers || undefined,
  });

  const stdErrLogger = createLogger({
    name: applicationId,
    streams: opts.streams || [{ stream: process.stderr, level: <LogLevelString>errorLogLevel }],
    serializers: opts.serializers || undefined,
  });

  if (opts.removeHostname) {
    delete stdOutLogger.fields.hostname;
    delete stdErrLogger.fields.hostname;
  }

  return createCustomLogger(stdOutLogger, stdErrLogger, opts.removeHostname);
}

export function getLoggerConfigurationFromEnv(options?: Partial<LoggerConfiguration>): LoggerConfiguration {
  const applicationId = process.env.APP_ID;
  if (!applicationId) {
    throw new Error('APP_ID environment variable is required to configure logger');
  }
  return {
    applicationId,
    prettyOut: process.env.NODE_ENV === 'development',
    logLevel: (process.env.APP_LOG_LEVEL || 'info') as TLogLevel,
    errorLogLevel: (process.env.APP_ERROR_LOG_LEVEL || 'error') as TErrorLogLevel,
    ...(options || {}),
  };
}
