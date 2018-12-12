const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_menu');
const menuModel = require('../model/menu.model')(DB);

const logger = require('../controllers/logger');
const utils = require('../utils/index');

const menu = {
  async addMenu (info) {
    return menuModel.add(info);
  },
  async delMenu (id) {
    return menuModel.delete(id);
  },
  async getTreeMenu () {
    const rows = menuModel.getAll({status: 1});

    const treeMenu = this.treeSortCreat(rows);
    return treeMenu;
  },
  filterArray (list, level, pid) {
    return list.filter(ret => ret.level === level && ret.pid === pid)
  },
  treeSortCreat (list) {
    if (!utils.isArray(list)) return

    const array1 = this.filterArray(list, 1, 0)
    const newArray1 = array1.map(ret => {
      const array2 = this.filterArray(list, ++ret.level, ret.pid)
      const newArray2 = array2.map(meta => {
        meta.children = this.filterArray(list, ++meta.level, meta.pid)
      })
      ret.children = newArray2
    })
    return newArray1
  },
  async excute () {
    // 事务
    await unitModel.ab();
  },
};

module.exports = menu;
