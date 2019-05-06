import { Context } from 'koa';

export default class Response {
  private ctx: Context;
  private data: object|string;

  constructor(ctx: Context, data: object|string) {
    this.ctx = ctx;
    this.data = data;
  }

  success() {
    return this.ctx.body = {
      status: 1,
      msg: 'success',
      data: this.data,
    }
  }

  fail() {
    return this.ctx.body = {
      status: -1,
      msg: this.data,
      data: '',
    }
  }
}