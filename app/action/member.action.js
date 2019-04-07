const Mysql = require('../common/helper/mysql')
const DB = new Mysql('wap_user_role')

const BaseAction = require('./base.action.class')
const MemberModel = require('../model/user.model')
const memberModel = new MemberModel(DB)

class MemberAction extends BaseAction {
  constructor (model) {
    super(model)
  }


}

module.exports = new MemberAction(memberModel)
