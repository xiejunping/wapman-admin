const router = require('koa-router')();
const action = require('../action/menu.action');
const DateFmt = require('../utils/date');
const logger = require('../controllers/logger');
const c = require('../controllers/decorator');

router.prefix('/menu');

// 获取树形菜单列表
router.get('/', c.oAuth, async (ctx, next) => {
  const treeMenu = await action.getTreeMenu();

  if (treeMenu) {
    ctx.data = treeMenu;
    return;
  } else ctx.throw('获取树形菜单失败', 400);
});

// 获取菜单详情
router.get('/:id', c.oAuth, async (ctx, next) => {
  const { id } = ctx.params;
  const info = await action.getMenuInfo(id);

  if (info) {
    ctx.data = info;
  } else {
    ctx.msg = '未找到菜单信息';
  }
  return;
});

router.post('/add', c.oAuth, c.invalid, async (ctx, next) => {
  const { pid, name, title, path, icon, component, status } = ctx.request.body;
  let level
  // 验重参
  if (await action.checkInfo({name})) {
    ctx.msg = '路由名称已存在，请更改重试';
    return
  }
  if (await action.checkInfo({path})) {
    ctx.msg = '路由路径已存在，请更改重试';
    return
  }
  if (parseInt(pid) === 0) level = parseInt(pid);
  else level = await action.getMenuLevel(pid);
  const menu = await action.addMenu({ pid, name, title, path, icon, level: ++level, component, status });
  if (menu.insertId) {
    logger.console(`菜单标题-${title}-添加成功：id为${menu.insertId}`);
    ctx.data = DateFmt.now();
    return;
  } else {
    ctx.throw('菜单添加失败', 400);
  }
});

router.delete('/del/:id', c.oAuth, async (ctx, next) => {
  const { id } = ctx.params;

  const info = await action.getMenuInfo(id);
  const children = await action.getChild(id);
  if (!info) {
    ctx.msg = '没有ID菜单信息';
    return
  }
  if (children.length) {
    ctx.msg = '菜单下有菜单，不能删除';
    return
  }
  const rs = await action.delMenu(id);
  if (rs.affectedRows === 1) {
    ctx.data = DateFmt.now();
    return;
  } else {
    ctx.throw('菜单删除错误', 400);
  }
});

router.patch('/edit', c.oAuth, c.invalid, async (ctx, next) => {
  const { id, pid, name, title, path, icon, component, status } = ctx.request.body;
  let level;
  // 验重参
  if (await action.checkInfo({name}, id)) {
    ctx.msg = '路由名称已存在，请更改重试';
    return
  }
  if (await action.checkInfo({path}, id)) {
    ctx.msg = '路由路径已存在，请更改重试';
    return
  }
  if (parseInt(pid) === 0) level = parseInt(pid);
  else level = await action.getMenuLevel(pid);
  const rs = await action.editMenu(id, { pid, name, title, path, level: ++level, icon, component, status });
  if (rs.affectedRows === 1) {
    ctx.data = DateFmt.now();
    return;
  } else {
    ctx.throw('菜单更新失败', 400);
  }
});

router.get('/order', c.oAuth, async (ctx, next) => {
  const { id } = ctx.session.user;


});

module.exports = router;
