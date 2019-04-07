const logger = require('../controllers/logger')

class Model {
  /**
   * 构造方法
   * @param DB
   */
  constructor (DB) {
    this.DB = DB
  }

  /**
   * 添加
   * @param info
   * @returns {Promise<*>}
   */
  async add(info) {
    try {
      return await this.DB.insert(info)
    } catch (err) {
      logger.error(err)
    }
  }

  /**
   * 更新
   * @param id
   * @param info
   * @returns {Promise<*>}
   */
  async update(id, info) {
    try {
      return await this.DB.update({id}, info)
    } catch (err) {
      logger.error(err)
    }
  }

  /**
   * 删除
   * @param id
   * @returns {Promise<*>}
   */
  async delete(id) {
    try {
      return await this.DB.remove({id})
    } catch (err) {
      logger.error(err)
    }
  }

  /**
   * 查询
   * @param id
   * @returns {Promise<*>}
   */
  async getInfoById (id) {
    try {
      return await this.DB.fetchRow({id})
    } catch (err) {
      logger.error(err)
    }
  }

  /**
   * 所有记录
   * @returns {Promise<*>}
   */
  async getAll () {
    try {
      return await this.DB.getAll()
    } catch (err) {
      logger.error(err)
    }
  }

  /**
   * 匹配
   * @param info
   * @returns {Promise<*>}
   */
  async getRow (info) {
    try {
      return await this.DB.fetchRow(info)
    } catch (err) {
      logger.error(err)
    }
  }

  /**
   * 查找
   * @param info
   * @returns {Promise<*>}
   */
  async getRows (info) {
    try {
      return await this.DB.fetchRows(info)
    } catch (err) {
      logger.error(err)
    }
  }

  /**
   * 自定义
   * @param sql
   * @returns {Promise<*>}
   */
  async query(sql) {
    try {
      return await this.DB.queryStr(sql)
    } catch (err) {
      logger.error(err)
    }
  }
}

module.exports = Model
