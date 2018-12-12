const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_menu');
const menuModel = require('../model/menu.model')(DB);

const logger = require('../controllers/logger');
const utils = require('../utils/index');

const menu = {
  async addMenu (info) {
    return await menuModel.add(info);
  },
  async delMenu (id) {
    return await menuModel.delete(id);
  },
  async editMenu (id, info) {
    return await menuModel.update(id, info)
  },
  async getTreeMenu () {
    const rows = await menuModel.getAll({status: 1});

    const treeMenu = this.treeSortCreat(rows);
    return treeMenu;
  },
  async getMenuInfo (id) {
    return await menuModel.getInfoById(id);
  },
  filterArray (list, level, pid) {
    const arr = list.filter(ret => ret.level === level && ret.pid === pid);
    arr.sort((a, b) => a.order - b.order);
    return arr
  },
  treeSortCreat (list) {
    if (!utils.isArray(list)) return;

    const array1 = this.filterArray(list, 1, 0);
    const newArray1 = array1.map(ret => {
      const array2 = this.filterArray(list, ret.level + 1, ret.id);
      const newArray2 = array2.map(meta => {
        meta.children = this.filterArray(list, meta.level + 1, meta.id);
        return meta;
      });
      ret.children = newArray2;
      return ret;
    });
    return newArray1;
  },
  async excute () {
    // 事务
    await unitModel.ab();
  },
};

module.exports = menu;
