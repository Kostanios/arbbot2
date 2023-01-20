import { Stream, Serializers } from 'bunyan';

export type TLogLevel = 'info' | 'debug' | 'warn' | 'trace';

export type TErrorLogLevel = 'error' | 'fatal';

export type LoggerConfiguration = {
  prettyOut?: boolean;

  applicationId: string;

  logLevel?: TLogLevel;

  errorLogLevel?: TErrorLogLevel;

  streams?: Stream[] | undefined;

  serializers?: Serializers | undefined;

  commonChildOptions?: Record<string, any>;

  /**
   * It is needed because when running in EKS
   * and watching by DataDog, it is resever attribute
   * HOSTNAME in logs. And if it is set in bunyan then logs
   * will not appears on DataDog
   */
  removeHostname?: boolean;
};
