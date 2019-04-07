const RD = require('../common/helper/redis');
const Mysql = require('../common/helper/mysql')
const DB = new Mysql('wap_login')

const BaseAction = require('./base.action.class')
const LoginModel = require('../model/login.model')
const loginModel = new LoginModel(DB)

class LoginAction extends BaseAction {
  constructor (model) {
    super(model)
  }

  /**
   * 新增登录记录
   * @param info
   * @returns {Promise<*|Promise<*>>}
   */
  async setLoginInfo (info) {
    info = Object.assign({mode: 'in'}, info)
    return super.add(info)
  }

  /**
   * 新增退出记录
   * @param info
   * @returns {Promise<*>}
   */
  async setLogoutInfo (info) {
    info = Object.assign({mode: 'out'}, info)
    return super.add(info)
  }

  async storeDel (session) {
    const stat = await RD.exists(session)
    if(!!stat) return await RD.del(session)
    return
  }
}

module.exports = new LoginAction(loginModel)
