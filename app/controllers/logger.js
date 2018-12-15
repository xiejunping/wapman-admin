const log4js = require('log4js');
const config = require('../common/config/logger');
const { formatError, formatRes } = require('./formatLog');

// 配置log4js
log4js.configure(config);

// 定义错误类型
const errorLogger = log4js.getLogger('error');
const resLogger = log4js.getLogger('response');
const infoLogger = log4js.getLogger('info');

const logger = {
  errLogger: (ctx, error, resTime) => {
    errorLogger.error(formatError(ctx, error, resTime));
  },
  resLogger: (ctx, resTime) => {
    resLogger.info(formatRes(ctx, resTime));
  },
  info: (args) => {
    args.shift();
    infoLogger.info(args.join('   '));
  },
  console: str => {
    infoLogger.info(str);
  },
  error: obj => {
    const str = JSON.stringify(obj);
    errorLogger.error(str);
  }
};

module.exports = logger;
