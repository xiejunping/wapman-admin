const session = require('koa-session');
const RedisStore = require('koa2-session-redis');
const { privateSession, sessionExprie } = require('../app/common/config/server');
const { host, port, password } = require('../app/common/config/redis');

const sess = app => {
  app.keys = ['kim and cobbler'];

  const ttl = sessionExprie * 60000;
  const CONFIG = {
    key: privateSession,
    maxAge: ttl,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,
    renew: false,
    store: new RedisStore({ host, port, password, ttl })
  };

  app.use(session(CONFIG, app));
};

module.exports = sess;
