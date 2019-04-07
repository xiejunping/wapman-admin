const router = require('koa-router')();
const action = require('../action/user.role.action');

const logger = require('../controllers/logger');
const c = require('../controllers/decorator');
const DateFmt = require('../utils/date');

router.prefix('/member');

router.get('/', c.oAuth, async (ctx, next) => {
  const { gid, pageIndex = 1, pageSize = 20 } = ctx.request.query;
  const page = parseInt(pageIndex);
  const limit = parseInt(pageSize);
  let params = { pageIndex: page, pageSize: limit };
  if (parseInt(gid)) params = Object.assign(params, {gid});
  const rows = await action.getMembers(params);
  const count = await action.countMembers(params);

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

module.exports = router;
