const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_unit');
const unitModel = require('../model/unit.model')(DB);

const action = {
  /**
   * 新增记录
   * @param info
   * @returns {Promise<*|Promise<*>>}
   */
  async addUnit (info) {
    return unitModel.add(info);
  },
  async excute () {
    // 事务
    await unitModel.ab();
  },
};

module.exports = action;
