/**
 * 配置文件
 * @type {{port: string, privateSession: string}}
 */

const dev = {
  host: 'localhost',
  port: '3000',
  privateSession: 'SESSIONID',  // koa-seeeion
  errLogin: 180,
  codeExpire: 30,
  codeValid: 5,
  sessionExprie: 1440 * 7,      // login session expire
  secret: 'WAPMAN'              // user pass secret
}

const prod = {
  host: 'localhost',
  port: '3000',
  privateSession: 'SESSIONID',  // koa-seeeion
  errLogin: 180,
  codeExpire: 30,
  codeValid: 5,
  sessionExprie: 1440 * 7,      // login session expire
  secret: 'WAPMAN'              // user pass secret
}

module.exports = process.env.NODE_ENV === 'production' ? prod : dev
