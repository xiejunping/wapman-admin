const router = require('koa-router')();
const action = require('../action/dept.action');
const DateFmt = require('../utils/date');
const logger = require('../controllers/logger');
const c = require('../controllers/decorator');

router.prefix('/dept');

router.get('/', c.oAuth, async (ctx, next) => {
  const treeDept = await action.getTreeDept();

  if (treeDept) {
    ctx.data = treeDept;
    return
  } else ctx.throw('获取树形分组失败', 400);
});

router.post('/add', c.oAuth, c.invalid, async (ctx, next) => {
  const { pid, name, status } = ctx.request.body;

  let level
  if (parseInt(pid) === 0) level = parseInt(pid);
  else level = await action.getDeptLevel(pid);
  const dept = await action.addDept({ pid, name, level: ++level, status });
  if (dept.insertId) {
    logger(`分组-${name}-添加成功：id为${dept.insertId}`);
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('分组添加失败', 400);
  }
});

router.delete('/del/:id', c.oAuth, async (ctx, next) => {
  const { id } = ctx.params;

  const info = await action.getDeptInfo(id);
  const children = await action.getChild(id);
  if (!info) {
    ctx.msg = '没有ID分组信息';
    return
  }
  if (children.length) {
    ctx.msg = '分组下有分组，不能删除';
    return
  }
  const rs = await action.delDept(id);
  if (rs.affectedRows === 1) {
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('分组删除错误', 400);
  }
});

router.patch('/edit', c.oAuth, c.invalid, async (ctx, next) => {
  const { id, pid, name, status } = ctx.request.body;

  let level
  if (parseInt(pid) === 0) level = parseInt(pid);
  else level = await action.getDeptLevel(pid);
  const rs = await action.editDept(id, { pid, name, level: ++level, status });
  if (rs.affectedRows === 1) {
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('分组更新失败', 400);
  }
});

module.exports = router;
