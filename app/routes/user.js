const router = require('koa-router')();
const md5 = require('md5');
const action = require('../action/user.action');
const actionLogin = require('../action/login.action');
const DateFmt = require('../utils/date');
const logger = require('../controllers/logger');
const Decorator = require('../controllers/decorator');
const c = new Decorator();

router.prefix('/user');

router.get('/', async (ctx, next) => {

});

router.post('/register', c.invalid, c.checkCode, async (ctx, next) => {
  const { username, password, phone, invite } = ctx.request.body;

  // 账号不存在
  const checkUserName = await action.checkInfo({name: username});
  if (!!checkUserName) {
    ctx.msg = '账号已存在';
    return;
  }

  // 随机邀请码
  const inviteCode = await action.createInviteCode();

  const user = await action.registerUser({
    name: username,
    password: md5(password),
    phone: phone,
    reg_date: Date.parse(new Date()),
    cid: inviteCode,
    pid: invite
  });

  // 接口返回
  if (user.insertId) {
    logger(`会员${username}注册成功：id为${user.insertId}`);
    ctx.data = DateFmt.now();
    return;
  } else {
    ctx.throw('注册会员失败', 400);
  }
});

router.post('/login', c.invalid, async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const client = ctx.request.headers['user-agent'];

  // 账号不存在
  const checkUserName = await action.checkInfo({name: username});
  if (!checkUserName) {
    ctx.msg = '账号不存在';
    return;
  }

  const times = await action.isLoginLock(username);
  if (times) {
    ctx.msg = '你试图在破解密码，请3个小时后再试';
    return;
  }

  const user = await action.checkPass(username, md5(password));
  if (!user) {
    await action.setTimeRedis(username);
    ctx.msg = '用户名或密码错误';
  } else {
    delete user.password;
    ctx.session.user = user;

    // 记入登录
    await actionLogin.setLoginInfo({
      uid: user.id,
      name: user.name,
      client: client,
      sessionId: user.sessionId,
      creat_date: DateFmt.now()
    });
    ctx.data = user;
  }
  return;
});

// 获取短信验证码
router.post('/code', c.invalid, async (ctx, next) => {
  const { phone } = ctx.request.body;
  const rs = await action.sendCode(phone);
  if (rs) {
    if (rs.result === 0) ctx.data = DateFmt.now();
    else ctx.msg = rs.errmsg;
    return;
  } else ctx.throw('发送短信验证码失败', 400);
});

// 手机号是否存在
router.get('/check', c.invalid, async (ctx, next) => {
  const { phone } = ctx.request.query;
  const checkUserPhone = await action.checkInfo({phone});

  ctx.data = checkUserPhone;
  return;
});

// 用户名是否存在
router.get('/name', c.invalid, async (ctx, next) => {
  const { username } = ctx.request.query;
  const checkUserName = await action.checkInfo({name: username});

  ctx.data = checkUserName;
  return;
})

module.exports = router
