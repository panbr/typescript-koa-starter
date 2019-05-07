import * as Koa from 'koa';
import { config } from './config';
import * as winston from 'winston';
import * as moment from 'moment';

const { timestamp, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${level} ${timestamp}: ${message}`;
});

export function logger(winstonInstance: any) {
  return async(ctx: Koa.Context, next: () => Promise<any>) => {

    const start = new Date().getMilliseconds();

    await next();

    const ms = new Date().getMilliseconds() - start;

    let logLevel: string;
    if (ctx.status >= 500) {
      logLevel = 'error';
    }
    if (ctx.status >= 400 && ctx.status < 500) {
      logLevel = 'warn';
    }
    if (ctx.status >= 100 && ctx.status < 400) {
      logLevel = 'info';
    }

    if (ctx.body.status === -1) {
      logLevel = 'error';
    }

    let msg: string = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;

    // error print full stack
    logLevel === 'error' ? (msg += ' detail: ' + JSON.stringify(ctx.body)) : '';

    winstonInstance.configure({
      level: config.debugLogging ? 'debug' : 'info',
      timestamp: () => {
        return moment().format('YYYY-MM-DD HH:MM:ss.SSS');
      },
      transports: [
        // - Write all logs error (and below) to `error.log`.
        new winston.transports.File({
          level: 'error',
          filename: 'logs/error.log',
          maxsize: 1024 * 1024 * 100, // 100MB
          format: winston.format.combine(
            timestamp(),
            myFormat
          )
        }),
        
        // - Write to all logs with specified level to console.
        new winston.transports.Console({ format: winston.format.combine(
            winston.format.colorize(),
            timestamp(),
            myFormat
          ) })
      ]
    });

    winstonInstance.log(logLevel, msg);
  }
}