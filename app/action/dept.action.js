const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_group');
const deptModel = require('../model/dept.model')(DB);

const logger = require('../controllers/logger');
const utils = require('../utils/index');

const action = {
  async addDept (info) {
    return await deptModel.add(info);
  },
  async delDept (id) {
    return await deptModel.delete(id);
  },
  async editDept (id, info) {
    return await deptModel.update(id, info);
  },
  async getAllDept () {
    const sqlMod = 'SELECT * FROM `wap_group`';
    return await deptModel.getAll(sqlMod);
  },
  async getTreeDept () {
    const rows = await this.getAllDept();
    const treeDept = this.treeSortCreat(rows);
    return treeDept;
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
  async getDeptInfo (id) {
    return await deptModel.getInfoById(id);
  },
  async getDeptLevel (id) {
    const { level } = await deptModel.getInfoById(id);
    return level
  },
  async getChild (pid) {
    return await deptModel.getRows({pid})
  }
}

module.exports = action;
