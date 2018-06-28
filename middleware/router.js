const glob = require('glob');
const path = require('path');
const routesPath = path.resolve(__dirname, '../app/routes');

/**
 * 路由中间件
 * @param app
 */
const router = app => {
  // 把路由表文件夹的路由拼接
  glob.sync(path.resolve(routesPath, './*.js')).forEach(path => {
    const router = require(path);

    app.use(router.routes()).use(router.allowedMethods());
  });
};

module.exports = router;
