const router = require('koa-router')()
const action = require('../action/common.action');
const actionUser = require('../action/user.action');
const DateFmt = require('../utils/date');
const logger = require('../controllers/logger');

const c = require('../controllers/decorator');

// 手机号是否存在
router.get('/phone/check', c.invalid, async (ctx, next) => {
  const { phone } = ctx.request.query;

  ctx.data = await actionUser.checkInfo({phone});
  return;
});

// 手机号与验证码验证
router.post('/phone/check/code', c.invalid, c.checkCode, async (ctx, next) => {
  const { phone } = ctx.request.body;
  const user = await actionUser.getInfoByPhone(phone);
  if (!!user) {
    ctx.data = DateFmt.now();
    return;
  } else logger(`手机号${phone}验证验证码失败`);
});

// 获取短信验证码 login
router.post('/code/login', c.invalid, async (ctx, next) => {
  const { phone } = ctx.request.body;
  const rs = await action.sendCodeLogin(phone);
  if (rs) {
    if (rs.result === 0) ctx.data = DateFmt.now();
    else ctx.msg = '腾讯云发送短信验证码，返回失败';
    return;
  } else ctx.throw('发送短信验证码失败', 400);
});

// 获取短信验证码 pass
router.post('/code/pass', c.invalid, async (ctx, next) => {
  const { phone } = ctx.request.body;
  const rs = await action.sendCodePass(phone);
  if (rs) {
    if (rs.result === 0) ctx.data = DateFmt.now();
    else ctx.msg = '腾讯云发送短信验证码，返回失败';
    return;
  } else ctx.throw('发送短信验证码失败', 400);
});

// 获取短信验证码 check
router.post('/code/check', c.invalid, async (ctx, next) => {
  const { phone } = ctx.request.body;
  const rs = await action.sendCodeCheck(phone);
  if (rs) {
    if (rs.result === 0) ctx.data = DateFmt.now();
    else ctx.msg = '腾讯云发送短信验证码，返回失败';
    return;
  } else ctx.throw('发送短信验证码失败', 400);
});

module.exports = router;
