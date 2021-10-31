import { Logger } from 'winston';
import buildDevLogger from './dev.logger';

function init() {
  let logger: Logger | any = null;
  if (process.env.NODE_ENV === 'development') {
    logger = buildDevLogger();
  } 
  return logger;
}

export const logger = init();

export const morganOption: any = {
  stream: {
    write(message: string) {
      logger.info(message.trim());      
    },
  },
};