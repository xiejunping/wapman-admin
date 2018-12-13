const router = require('koa-router')();
const action = require('../action/role.action');
const DateFmt = require('../utils/date');
const logger = require('../controllers/logger');
const c = require('../controllers/decorator');

router.prefix('/role');

router.get('/:id', c.oAuth, async (ctx, next) => {
  const { id } = ctx.params;

  if (treeDept) {
    ctx.data = treeDept;
    return
  } else ctx.throw('获取树形分组失败', 400);
});

router.post('/add', c.oAuth, c.invalid, async (ctx, next) => {
  const { gid, name, status } = ctx.request.body;

  const role = await action.addDept({ pid, name, status });
  if (role.insertId) {
    logger(`角色-${name}-添加成功：id为${role.insertId}`);
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('角色添加失败', 400);
  }
});

module.exports = router;
