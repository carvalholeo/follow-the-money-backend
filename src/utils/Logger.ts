import { configure, getLogger } from 'log4js';
import path from 'path';

class Logger {
  makeLog(category: string, message: string): void {
    const errorFile = path.resolve(__dirname, 'logs', 'error', 'error.log');
    const logger = getLogger(category.toString());
    
    logger.error(message);

    configure({
      appenders: { 
        error: {
          type: 'file', 
          filename: errorFile,
          maxLogSize: 100000,
          backups: 10,
          encoding: 'utf-8',
          compress: true,
          keepFileExt: true,
          layout: {
            type: 'pattern', 
            pattern: '%d %p %c %f:%l %m%n'
          }
        }
      },
      categories: { 
        default: { 
          appenders: ['error'], 
          level: 'error',
          enableCallStack: true
        } 
      }
    });
  }
}

export default Logger;
