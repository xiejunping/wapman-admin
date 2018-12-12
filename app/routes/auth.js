const router = require('koa-router')();
const DateFmt = require('../utils/date');
const logger = require('../controllers/logger');
const c = require('../controllers/decorator');

router.prefix('/auth');

router.get('/', async (ctx, next) => {
  ctx.type = 'html';
  await ctx.render('index', {
    title: 'John'
  });
});

router.get('/menu', c.oAuth, async (ctx, next) => {
  const { id } = ctx.session.user;


});

router.get('/:id', c.oAuth, async (ctx, next) => {
  const { id } = ctx.session.user;


});

module.exports = router;
