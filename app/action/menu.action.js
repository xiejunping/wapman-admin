const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_menu');

const BaseAction = require('./base.action.class')
const MenuModel = require('../model/menu.model')
const menuModel = new MenuModel(DB)

const { treeSortCreat } = require('../utils/tree');

class MenuAction extends BaseAction {

  constructor (model) {
    super(model)
  }

  /**
   * 获取树形结构
   * @param info
   * @returns {Promise<void>}
   */
  async getTreeMenu (info) {
    let sqlMod;
    if (info) {
      const {status, mid} = info;
      sqlMod = `SELECT * FROM \`wap_menu\` WHERE status = ${status} AND id in (${mid})`;
    } else sqlMod = 'SELECT * FROM `wap_menu`';
    const rows = await super.getAll(sqlMod);
    return treeSortCreat(rows);
  }

  /**
   * 获取其层级
   * @param id
   * @returns {Promise<void>}
   */
  async getMenuLevel (id) {
    const { level } = await super.getInfo(id);
    return level
  }

  /**
   * 验证是否存在
   * @param info 查找条件
   * @param id 自有ID
   * @returns {Promise<boolean>}
   */
  async checkInfo (info, id) {
    const row = await super.getRow(info);
    if (id && row) {
      return !(row.id === parseInt(id))
    }
    return !!row
  }

  // 事务
  async excute () {
    await unitModel.ab();
  }
}

module.exports = new MenuAction(menuModel)
