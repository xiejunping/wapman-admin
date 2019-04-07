const Mysql = require('../common/helper/mysql')
const DB = new Mysql('wap_role_access')

const BaseAction = require('./base.action.class')
const RoleAccessModel = require('../model/role.access.model')
const roleAccessModel = new RoleAccessModel(DB)

class RoleAccessAction extends BaseAction {
  constructor (model) {
    super(model)
  }
}

module.exports = new RoleAccessAction(roleAccessModel)
