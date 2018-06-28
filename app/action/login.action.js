const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_login');
const loginModel = require('../model/login.model')(DB);

const login = {
  /**
   * 新增登录记录
   * @param info
   * @returns {Promise<*|Promise<*>>}
   */
  async setLoginInfo (info) {
    return loginModel.add(info);
  }
};

module.exports = login;
