const Koa = require('koa');
const app = new Koa();

// 多个中间件
const root = require('./middleware/root');
const connect = require('./middleware/connect');
const sess = require('./middleware/sess');
const router = require('./middleware/router');
const database = require('./middleware/database');

root(app);
connect(app);
sess(app);
router(app);
database(app);

module.exports = app;
