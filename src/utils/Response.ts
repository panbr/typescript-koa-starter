import { Context } from 'koa';

export default new class {
  constructor() {}

  success(ctx: Context, data: object|string = null) {
    return ctx.body = {
      status: 1,
      msg: 'success',
      data: data,
    }
  }

  fail(ctx: Context, data: object|string = null) {
    return ctx.body = {
      status: -1,
      msg: data,
      data: '',
    }
  }
}
