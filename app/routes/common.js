const router = require('koa-router')();
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

// 生成短链接
router.get('/url/short', c.invalid, async (ctx, next) => {
  const { address } = ctx.request.query;

  const response = await action.creatShortURL(address);

  if(!response) {
    ctx.msg = '请求第三方接口错误';
    return;
  }

  if (response.status === 200 && response.data.urls && response.data.urls.length) {
    const { url_short, url_long, result } = response.data.urls[0];
    ctx.data = { url_short, url_long, result };
    return;
  } else ctx.throw(response.statusText, 400);
});

// 扫码注册
router.get('/weixin/register', c.invalid, async (ctx, next) => {
  const { code, status } = ctx.request.query;

  // 微信获取access_token
  const response = await action.getAccessToken(code);

  if(!response) {
    ctx.msg = '微信获取access_token错误';
    return;
  }

  // 微信接口调用依赖
  if (response.status === 200 && response.data) {
    const { access_token, openid} = response.data;

    logger(access_token, openid)
    if (access_token && openid) {
      const userInfo = await action.getUserInfo(access_token, openid);
      if(!userInfo) {
        ctx.msg = '微信获取个人信息错误';
        return;
      }

      ctx.data = userInfo;
      return;
    } else ctx.throw(response.statusText, 400);
  } else ctx.throw(response.statusText, 400);
});

module.exports = router;
