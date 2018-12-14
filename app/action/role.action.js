const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_role');
const roleModel = require('../model/role.model')(DB);

const logger = require('../controllers/logger');
const utils = require('../utils/index');

const action = {
  async addRole (info) {
    return await roleModel.add(info)
  },
  async delRole (id) {
    return await roleModel.delete(id)
  },
  async editRole (id, info) {
    return await roleModel.update(id, info);
  },
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
    return await roleModel.fetchAll(info);
  },
  async countRoles ({gid}) {
    const info = {
      tableName: 'wap_role',
      whereJson: {
        and: {gid}
      }
    };
    const rs = await roleModel.fetchAll(info);
    return !!rs ? rs.length : 0
  },
  async getRolesByJson (info) {
    return await roleModel.getRows(info);
  }
}

module.exports = action;
