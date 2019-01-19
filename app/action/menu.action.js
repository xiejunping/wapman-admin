const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_menu');
const menuModel = require('../model/menu.model')(DB);
const { treeSortCreat } = require('../utils/tree');

const action = {
  async addMenu (info) {
    return await menuModel.add(info);
  },
  async delMenu (id) {
    return await menuModel.delete(id);
  },
  async editMenu (id, info) {
    return await menuModel.update(id, info)
  },
  async getTreeMenu (info) {
    let sqlMod;
    if (info) {
      const {status, mid} = info;
      sqlMod = `SELECT * FROM \`wap_menu\` WHERE status = ${status} AND id in (${mid})`;
    } else sqlMod = 'SELECT * FROM `wap_menu`';
    const rows = await menuModel.getAll(sqlMod);
    return treeSortCreat(rows);
  },
  async getMenuInfo (id) {
    return await menuModel.getInfoById(id);
  },
  async getMenuLevel (id) {
    const { level } = await menuModel.getInfoById(id);
    return level
  },
  async getChild (pid) {
    return await menuModel.getRows({pid})
  },
  async checkInfo (info, id) {
    const row = await menuModel.getInfoByJson(info);
    if (id && row) {
      return !(row.id === parseInt(id))
    }
    return !!row
  },
  async excute () {
    // 事务
    await unitModel.ab();
  },
};

module.exports = action;
