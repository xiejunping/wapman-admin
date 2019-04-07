const Mysql = require('../common/helper/mysql')
const DB = new Mysql('wap_group')

const BaseAction = require('./base.action.class')
const DeptModel = require('../model/dept.model')
const deptModel = new DeptModel(DB)

const { treeSortCreat } = require('../utils/tree') // 树形结构

class DeptAction extends BaseAction {
  constructor (model) {
    super(model)
  }

  /**
   * 取部门
   * @param id
   * @returns {Promise<void>}
   */
  async getDeptLevel (id) {
    const { level } = await super.getInfo(id)
    return level
  }

  async getTreeDept () {
    const rows = await super.getAll()
    return treeSortCreat(rows)
  }
}

module.exports = new DeptAction(deptModel)
