const router = require('koa-router')();
const action = require('../action/role.action');
const actionDept = require('../action/dept.action');

const logger = require('../controllers/logger');
const c = require('../controllers/decorator');
const DateFmt = require('../utils/date');

router.prefix('/role');

router.get('/', c.oAuth, c.invalid, async (ctx, next) => {
  const { gid, pageIndex = 1, pageSize = 20 } = ctx.request.query;
  const page = parseInt(pageIndex);
  const limit = parseInt(pageSize);
  let params = { pageIndex: page, pageSize: limit };
  if (parseInt(gid)) params = Object.assign(params, {gid});
  const rows = await action.getRoles(params);
  const count = await action.countRoles(params);
  // gid -> gname
  const groups = await actionDept.getAll();
  rows.map(ret => {
    ret.gid = groups[groups.findIndex(met => met.id === ret.gid)].name
    return ret
  })
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

  const role = await action.add({ gid, name, status });
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
  const rs = await action.del(id);
  if (rs.affectedRows === 1) {
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('角色删除错误', 400);
  }
});

router.patch('/edit', c.oAuth, c.invalid, async (ctx, next) => {
  const { id, gid, name, status } = ctx.request.body;
  const rs = await action.edit(id, { gid, name, status });
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
  const rs = await action.removeRole(id, gid);
  if (rs.affectedRows) {
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('角色更新失败', 400);
  }
});

module.exports = router;
