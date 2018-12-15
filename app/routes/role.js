const router = require('koa-router')();
const action = require('../action/role.action');
const DateFmt = require('../utils/date');
const logger = require('../controllers/logger');
const c = require('../controllers/decorator');

router.prefix('/role');

router.get('/', c.oAuth, c.invalid, async (ctx, next) => {
  const { gid, pageIndex = 1, pageSize = 20 } = ctx.request.query;
  const page = parseInt(pageIndex)
  const limit = parseInt(pageSize)
  const params = { gid, pageIndex: page, pageSize: limit }
  const rows = await action.getRoles(params)
  const count = await action.countRoles(params)
  if (rows) {
    ctx.data = {
      pageIndex: page,
      pageSize: limit,
      list: rows,
      count
    };
    return
  } else ctx.throw('获取树形分组失败', 400);
});

router.post('/add', c.oAuth, c.invalid, async (ctx, next) => {
  const { gid, name, status } = ctx.request.body;

  const role = await action.addRole({ gid, name, status });
  if (role.insertId) {
    logger.console(`角色-${name}-添加成功：id为${role.insertId}`);
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('角色添加失败', 400);
  }
});

router.delete('/del/:id', c.oAuth, async (ctx, next) => {
  const { id } = ctx.params;
  const rs = await action.delRole(id);
  if (rs.affectedRows === 1) {
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('角色删除错误', 400);
  }
});

router.patch('/edit', c.oAuth, c.invalid, async (ctx, next) => {
  const { id, gid, name, status } = ctx.request.body;
  const rs = await action.editRole(id, { gid, name, status });
  if (rs.affectedRows === 1) {
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('角色更新失败', 400);
  }
});

// 批量移动组角色
router.patch('/remove', c.oAuth, async (ctx, next) => {
  const { id, gid } = ctx.request.body;
  console.log(id, gid)
  const rs = await action.removeRole(id, gid);
  // const rs = await action.editRole(id, { gid, name, status });
  if (rs.affectedRows === 1) {
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('角色更新失败', 400);
  }
});

module.exports = router;
