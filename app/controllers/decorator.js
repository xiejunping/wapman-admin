const utils = require('../utils/index');
const crypto = require('../utils/crypto');
const { codeExpire, codeValid } = require('../common/config/server');

function Decorator() {

}

/**
 * 验证登录
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
Decorator.prototype.oAuth = async (ctx, next) => {
  ctx.app.on('missed', () => {
    ctx.auth = '验证失败，请登陆'
  });
  ctx.app.on('expired', () => {
    ctx.auth = '验证已过期，请重新登陆'
  });
  if(ctx.session.user) await next();
  else ctx.auth = '验证已失效，请重新登陆'
}

/**
 * 验证参数
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
Decorator.prototype.invalid = async (ctx, next) => {
  const routeRules = require('./rules');
  const rules = routeRules[ctx.path]

  if (!utils.isArray(rules)) ctx.throw('rule must be array', 400)

  let msg = ''
  const passReg = new RegExp('pass')
  const params = ctx.request.method === 'GET' ? ctx.request.query : ctx.request.body

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    const param = passReg.test(rule.name) ? crypto.aesDecrypt(params[rule.name]) : params[rule.name]

    // 必填
    if (rule.require && !param || rule.require && utils.isEmpty(param)) {
      msg = `${rule.desc}不能为空`
      break
    }

    // 长度判断
    if (param && rule.max < param.length) {
      msg = `${rule.desc}不能多于${rule.max}位`
      break
    }
    if (param && rule.min > param.length) {
      msg = `${rule.desc}不能少于${rule.min}位`
      break
    }

    // 正则
    if (rule.pattern) {
      const reg = new RegExp(rule.pattern)
      if (!reg.test(param)) {
        msg = `${rule.desc}不是有效的值`
        break
      }
    }
  }

  if (msg) ctx.msg = msg
  else await next()
}

/**
 * 验证码无效
 * @param ctx
 * @param next
 * @returns {Promise<any>}
 */
Decorator.prototype.checkCode = async (ctx, next) => {
  const RD = require('../common/helper/redis');
  const { phone, code } = ctx.request.body;

  // 手机号是否存在redis
  const isPhone = await RD.exists(phone);
  if (!isPhone) {
    ctx.msg = '手机号还未发送验证码';
    return;
  }

  const val = await RD.get(phone);
  const index = await RD.pttl(phone);

  if (val === code) {
    if (index > ((codeExpire - codeValid) * 60000)) {
      RD.del(phone);
      await next();
    } else {
      ctx.msg = '验证码已过期';
      return;
    }
  } else {
    if (index === -1) ctx.msg('存在无过期的验证码');
    else ctx.msg = '验证码不正确';
    return;
  }
}

module.exports = new Decorator();
