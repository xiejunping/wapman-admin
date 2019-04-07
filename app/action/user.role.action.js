const Mysql = require('../common/helper/mysql')
const DB = new Mysql('wap_user_role')

const BaseAction = require('./base.action.class')
const UseRoleModel = require('../model/user.role.model')
const useRoleModel = new UseRoleModel(DB)

class UseRoleAction extends BaseAction {
  constructor (model) {
    super(model)
  }

  async getMembers ({gid, pageIndex, pageSize}) {
    const info = {
      tableName: 'wap_user_role',
      whereJson: {
        and: {gid}
      },
      limitArr: [
        (pageIndex - 1) * pageSize, pageSize
      ]
    };
    return await this.Model.fetchAll(info)
  }

  async countMembers ({gid}) {
    const info = {
      tableName: 'wap_user_role',
      whereJson: {
        and: {gid}
      }
    };
    const rs = await this.Model.fetchAll(info)
    return !!rs ? rs.length : 0
  }

  async getUserRole (uid) {
    return await super.getRow({uid})
  }
}

module.exports = new UseRoleAction(useRoleModel)
