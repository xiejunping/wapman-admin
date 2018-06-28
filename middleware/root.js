const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

const root = app => {
  // 根目录显示星空
  router.get('/', (ctx, next) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.resolve(__dirname, '../public/index.html'));
  });

  app.use(router.routes()).use(router.allowedMethods());
}

module.exports = root
