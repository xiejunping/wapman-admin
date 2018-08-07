/**
 * 在app.use(router)之前调用
 */
const response_formatter = async (ctx, next) => {
  //先去执行路由
  await next();

  if (ctx.type) return;

  //如果有返回数据，将返回数据添加到data中
  if (ctx.msg !== undefined) {
    ctx.body = {
      code: 400,
      msg: ctx.msg,
      data: false
    }
  } else if (ctx.data !== undefined) {
    ctx.body = {
      code: 0,
      msg: '',
      data: ctx.data
    }
  } else if (ctx.auth !== undefined) {
    ctx.body = {
      code: 110,
      msg: ctx.auth,
      data: false
    }
  }
}

module.exports = response_formatter
