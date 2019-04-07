const router = require('koa-router')();
const action = require('../action/user.role.action');
const actionRoleAccess = require('../action/role.access.action');
const actionAccess = require('../action/access.action');
const actionMenu = require('../action/menu.action');

const logger = require('../controllers/logger');
const c = require('../controllers/decorator');
const DateFmt = require('../utils/date');

router.prefix('/auth');

router.get('/', async (ctx, next) => {
  ctx.type = 'html';
  await ctx.render('index', {
    title: 'John'
  });
});

router.get('/menu', c.oAuth, async (ctx, next) => {
  const { id } = ctx.session.user;
  // 查找用户角色
  const userRoleInfo = await action.getRow({uid: id});
  if (!userRoleInfo) {
    logger.console(`ID${id}用户查找角色对应关系发生异常！`);
    ctx.msg = '用户信息有误';
    return
  }
  // 角色
  const {rid} = userRoleInfo;
  const access = await actionRoleAccess.getRows({rid});
  if (access.length) {
    // 根据权限查找菜单ids
    const aids = access.map(ret => ret.aid);
    const rs = await actionAccess.getRows([...new Set(aids)]);
    const mid = rs.map(ret => ret.mid);
    // 根据菜单获取权限菜单树
    const treeMenu = await actionMenu.getTreeMenu({status: 1, mid: [...new Set(mid)]});
    if (treeMenu) {
      ctx.data = treeMenu;
      return;
    } else ctx.throw('获取树形权限菜单失败', 400);
  } else {
    logger.console(`ID${id}用户暂无角色对应关系`);
    ctx.data = access;
  }
});

router.get('/:id', c.oAuth, async (ctx, next) => {
  const { id } = ctx.session.user;


});

module.exports = router;
