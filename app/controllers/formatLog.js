const DateFmt = require('../utils/date');

/**
 * 错误格式
 * @param ctx
 * @param err
 * @param costTime
 * @returns {string}
 */
exports.formatError = (ctx, err, costTime = DateFmt.now()) => {
  let method = ctx.method;
  let url = ctx.url;
  let body = ctx.request.body;
  let userAgent = ctx.header.userAgent;
  return {method, url, body, costTime, userAgent, err};
};


/**
 * 响应格式
 * @param ctx
 * @param costTime
 * @returns {string}
 */
exports.formatRes = (ctx, costTime) => {
  let method = ctx.method;
  let url = ctx.url;
  let body = ctx.request.body;
  let response = ctx.response;
  return {method, url, body, costTime, response};
};
