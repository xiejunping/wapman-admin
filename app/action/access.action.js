const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_access');
const accessModel = require('../model/access.model')(DB);
const { treeSortCreat } = require('../utils/tree');

const action = {
  async addAccess (info) {
    return await accessModel.add(info);
  },
  async delAccess (id) {
    return await accessModel.delete(id);
  },
  async editAccess (id, info) {
    return await accessModel.update(id, info);
  },
  async getTreeAccess () {
    const sqlMod = 'SELECT * FROM `wap_access`';
    const rows = await accessModel.getAll(sqlMod);
    return treeSortCreat(rows)
  },
  async getAccessInfo (id) {
    return await accessModel.getInfoById(id);
  },
  async getAccessLevel (id) {
    const { level } = await accessModel.getInfoById(id);
    return level
  },
  async getChild (pid) {
    return await accessModel.getRows({pid})
  },
  async getRows (ids) {
    const sqlMod = `SELECT \`mid\` FROM \`wap_access\` WHERE \`id\` in (${ids})`;
    return await accessModel.getAll(sqlMod)
  }
};

module.exports = action;
