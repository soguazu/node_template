import { Logger, createLogger, format, transports } from 'winston';

import path from 'path';

const { combine, printf, errors } = format;

const rootPath = path.resolve(__dirname, '..', '..', '..');

const options = {
  file: {
    level: 'info',
    filename: `${rootPath}/logs/app.log`,
    handleExceptions: false,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  error: {
    level: 'error',
    filename: `${rootPath}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

function buildDevLogger(): Logger {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  return createLogger({
    format: combine(
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console(), new transports.File(options.error), new transports.File(options.file)],
    exitOnError: false, // do not exit on handled exceptions
  });
}

export default buildDevLogger;
