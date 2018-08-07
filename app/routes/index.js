const router = require('koa-router')();
const action = require('../action/unit.action');
const DateFmt = require('../utils/date');
const logger = require('../controllers/logger');
const c = require('../controllers/decorator');

router.prefix('/index');

router.get('/', async (ctx, next) => {

});

router.get('/add', async (ctx, next) => {
  console.log(1);
  await action.excute();
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
