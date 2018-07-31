const path = require('path');
const favicon = require('koa-favicon');
const cors = require('koa2-cors');
// const json = require('koa-json');
const logger = require('koa-logger');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')
const koaStatic = require('koa-static');
const views = require('koa-views')

const resFormat = require('../app/controllers/responseFmt');
const log = process.env.NODE_ENV === 'production' ? (str, args) => log4js.info(args) : ''

const connect = app => {

  // JSON
  app.use(bodyparser({
    formLimit: '1mb',
    enableTypes:['json', 'form', 'text']
  }))

  // 只接收json content-type
  // app.use(json())

  // error-handling
  onerror(app)
  app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
  });
  // app.on('missed', () => {
  //   ctx.auth = '验证失败，请登陆'
  //   console.error(ctx.auth)
  // });
  // app.on('expired', () => {
  //   ctx.auth = '验证已过期，请重新登陆'
  //   console.error(ctx.auth)
  // });

  // 日志
  app.use(logger(log))

  // 静态目录
  app.use(koaStatic(path.join(__dirname, '../public/')))

  // 网站图标
  app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')))

  // 跨域支持
  app.use(cors({ maxAge: 3600, credentials: true }))

  // 模版
  app.use(views(path.join(__dirname, '../app/views'), {
    extension: 'pug'
  }))

  // 格式化输出
  app.use(resFormat)
}

module.exports = connect
