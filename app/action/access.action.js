const Mysql = require('../common/helper/mysql')
const DB = new Mysql('wap_access')

const BaseAction = require('./base.action.class')
const AccessModel = require('../model/access.model')
const accessModel = new AccessModel(DB)

const { treeSortCreat } = require('../utils/tree') // 树形结构

class AccessAction extends BaseAction {
  /**
   * 构造函数
   * @param model
   */
  constructor (model) {
    super(model)
  }

  /**
   * 取出记录 树形结构
   * @returns {Promise<void>}
   */
  async getTreeAccess () {
    const rows = await super.getAll()
    return treeSortCreat(rows)
  }

  /**
   * 查出等级
   * @param id
   * @returns {Promise<*>}
   */
  async getAccessLevel (id) {
    const { level } = await super.getInfoById(id)
    if (level) return level
    else throw new Error(`getAccessLevel中level：${level}`)
  }

  /**
   *
   * @param ids
   * @returns {Promise<*>}
   */
  async getRows (ids) {
    const sqlMod = `SELECT \`mid\` FROM \`wap_access\` WHERE \`id\` in (${ids})`;
    return await super.query(sqlMod)
  }
}

module.exports = new AccessAction(accessModel)
