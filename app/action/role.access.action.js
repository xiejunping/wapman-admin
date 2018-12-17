const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_role_access');
const roleAccessModel = require('../model/role.access.model')(DB);

const action = {
  async addAccess (info) {
    return await roleAccessModel.add(info);
  },
  async delAccess (id) {
    return await roleAccessModel.delete(id);
  },
  async getRowsByJson (info) {
    return await roleAccessModel.getRows(info);
  },
  async editAccess (id, info) {
    return await roleAccessModel.update(id, info);
  },
  async getAccessInfo (id) {
    return await roleAccessModel.getInfoById(id);
  }
};

module.exports = action;
