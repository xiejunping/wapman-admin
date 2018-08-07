const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_login');
const RD = require('../common/helper/redis');
const loginModel = require('../model/login.model')(DB);

const login = {
  /**
   * 新增登录记录
   * @param info
   * @returns {Promise<*|Promise<*>>}
   */
  async setLoginInfo (info) {
    info = Object.assign({mode: 'in'}, info);
    return loginModel.add(info);
  },
  async setLogoutInfo (info) {
    info = Object.assign({mode: 'out'}, info);
    return loginModel.add(info);
  },
  async storeDel (session) {
    const stat = await RD.exists(session);
    if(!!stat) return await RD.del(session);
    return;
  },
};

module.exports = login;
