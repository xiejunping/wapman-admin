const path = require('path');
const favicon = require('koa-favicon');
const cors = require('koa2-cors');
// const json = require('koa-json');
const logger = require('koa-logger');
const onError = require('koa-onerror');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const views = require('koa-views');

const resFormat = require('../app/controllers/responseFmt');
const log = process.env.NODE_ENV === 'production' ? (str, args) => log4js.info(args) : '';
const err = process.env.NODE_ENV === 'production' ? (err, ctx) => log4js.errLogger(ctx, err) : (err, ctx) => log4js.error(err, ctx);

const connect = app => {

  // JSON
  app.use(bodyParser({
    formLimit: '1mb',
    enableTypes:['json', 'form', 'text']
  }));

  // 只接收json content-type
  // app.use(json())

  // error-handling
  onError(app);
  app.on('error', err);
  // app.on('missed', () => {
  //   ctx.auth = '验证失败，请登陆'
  //   console.error(ctx.auth)
  // });
  // app.on('expired', () => {
  //   ctx.auth = '验证已过期，请重新登陆'
  //   console.error(ctx.auth)
  // });

  // 日志
  app.use(logger(log));

  // 静态目录
  app.use(koaStatic(path.join(__dirname, '../public/'), { maxAge: 60000 * 1440 * 30 }));

  // 网站图标
  app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));

  // 跨域支持
  app.use(cors({ maxAge: 3600, credentials: true }));

  // 模版
  app.use(views(path.join(__dirname, '../app/views'), {
    extension: 'pug'
  }));

  // 格式化输出
  app.use(resFormat);
};

module.exports = connect;
