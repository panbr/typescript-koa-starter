import * as Koa from 'koa';
import * as HttpStatus from 'http-status-codes';
import * as bodyParser from 'koa-bodyparser';
import 'reflect-metadata';
import {createKoaServer} from 'routing-controllers';
import * as dotenv from 'dotenv';
import * as winston from 'winston';
import { logger } from './config/logger';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

const app = createKoaServer({
  controllers: [__dirname + "/controller/*.controller.ts"]
})

// Middleware
app.use(bodyParser());

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    let r = await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston));

export default app;