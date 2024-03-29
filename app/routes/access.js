const router = require('koa-router')();
const action = require('../action/access.action');

const logger = require('../controllers/logger');
const c = require('../controllers/decorator');
const DateFmt = require('../utils/date');

router.prefix('/access');

router.get('/', c.oAuth, async (ctx, next) => {
  const treeAccess = await action.getTreeAccess();
  if (treeAccess) {
    ctx.data = treeAccess;
    return
  } else ctx.throw('获取树形权限失败', 400);
});

router.get('/:id', c.oAuth, async (ctx, next) => {
  const { id } = ctx.params;
  const info = await action.getInfo(id);
  if (info) {
    ctx.data = info
  } else {
    ctx.msg = '未找到权限信息'
  }
  return
});

router.post('/add', c.oAuth, c.invalid, async (ctx, next) => {
  const {pid, mid, type, name, urls, status} = ctx.request.body;
  let level;
  if (parseInt(pid) === 0) level = parseInt(pid);
  else level = await action.getAccessLevel(pid);
  const access = await action.add({ pid, mid, name, type, level: ++level, urls, status });
  if (access.insertId) {
    logger.console(`权限-${name}-添加成功：id为${access.insertId}`);
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('权限添加失败', 400);
  }
});

router.patch('/edit', c.oAuth, c.invalid, async (ctx, next) => {
  const {id, pid, mid, type, name, urls, status} = ctx.request.body;
  let level;
  if (parseInt(pid) === 0) level = parseInt(pid);
  else level = await action.getAccessLevel(pid);
  const rs = await action.edit(id, { pid, mid, name, type, level: ++level, urls, status });
  if (rs.affectedRows === 1) {
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('权限更新失败', 400);
  }
});

router.delete('/del/:id', c.oAuth, async (ctx, next) => {
  const { id } = ctx.params;
  const info = await action.getInfo(id);
  const children = await action.getChild(id);
  if (!info) {
    ctx.msg = '没有ID权限信息';
    return
  }
  if (children.length) {
    ctx.msg = '权限下有权限，不能删除';
    return
  }
  const rs = await action.del(id);
  if (rs.affectedRows === 1) {
    ctx.data = DateFmt.now();
    return
  } else {
    ctx.throw('权限删除错误', 400);
  }
});

module.exports = router;
