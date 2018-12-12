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

router.post('/add', c.oAuth, c.invalid, async (ctx, next) => {
  const { pid, name, title, path, icon, component, status } = ctx.request.body;

  const { level } = await action.getMenuInfo(pid);
  const menu = await action.addMenu({ pid, name, title, path, icon, level: level + 1, component, status });
  if (menu.insertId) {
    logger(`菜单标题-${title}-添加成功：id为${menu.insertId}`);
    ctx.data = DateFmt.now();
    return;
  } else {
    ctx.throw('菜单添加失败', 400);
  }
});

router.delete('/del/:id', c.oAuth, async (ctx, next) => {
  const { id } = ctx.params;
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

  const { level } = await action.getMenuInfo(pid);
  const rs = await action.editMenu(id, { pid, name, title, path, level: level + 1, icon, component, status });
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
