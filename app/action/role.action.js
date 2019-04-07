const Mysql = require('../common/helper/mysql')
const DB = new Mysql('wap_role')

const BaseAction = require('./base.action.class')
const RoleModel = require('../model/role.model')
const roleModel = new RoleModel(DB)

const logger = require('../controllers/logger');
const utils = require('../utils/index');

const Mailer = require('../controllers/mailer')

class RoleAction extends BaseAction {
  constructor (model) {
    super(model)
  }

  async getRoles ({gid, pageIndex, pageSize}) {
    const info = {
      tableName: 'wap_role',
      whereJson: {
        and: {gid}
      },
      limitArr: [
        (pageIndex - 1) * pageSize, pageSize
      ]
    };
    return await this.Model.fetchAll(info)
  }

  async countRoles ({gid}) {
    const info = {
      tableName: 'wap_role',
      whereJson: {
        and: {gid}
      }
    };
    const rs = await this.Model.fetchAll(info)
    return !!rs ? rs.length : 0
  }

  async getRolesByJson (info) {
    return await super.getRows(info)
  }

  async removeRole (id, gid) {
    try {
      const sqlMod = `UPDATE \`wap_role\` SET \`gid\` = ${gid} WHERE id IN (${id.join(',')})`
      return await super.query(sqlMod)
      // return await Mailer.sendMail('xiejunping@caohua.com', 'nodejs服务器发送邮件', '<b>Hello world?</b>');
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = new RoleAction(roleModel)
