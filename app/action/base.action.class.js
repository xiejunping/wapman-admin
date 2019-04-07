/**
 * 基础操作类
 */
class BaseAction {

  /**
   * 构造方法
   * @param model 数据表模型
   */
  constructor (model) {
    this.Model = model
  }

  /**
   * 添加记录
   * @param info 记录对象
   * @returns {Promise<*>} 返回插入ID
   */
  async add (info) {
    return await this.Model.add(info)
  }

  /**
   * 修改记录
   * @param id 记录主键
   * @param info 记录对象
   * @returns {Promise<*>} 返回受影响行数
   */
  async edit (id, info) {
    return await this.Model.update(id, info)
  }

  /**
   * 删除记录
   * @param id 记录主键
   * @returns {Promise<void>}
   */
  async del (id) {
    return await this.Model.delete(id)
  }

  /**
   * 单条记录
   * @param id
   * @returns {Promise<*>}
   */
  async getInfo (id) {
    return await this.Model.getInfoById(id)
  }

  /**
   * 取所有的记录
   * @returns {Promise<*>}
   */
  async getAll () {
    return await this.Model.getAll()
  }

  /**
   * 取所有子类
   * @param pid 父类ID
   * @returns {Promise<*>}
   */
  async getChild (pid) {
    return await this.Model.getRows({pid})
  }

  /**
   * 根据条件取子集
   * @param info
   * @returns {Promise<*>}
   */
  async getRow (info) {
    return await this.Model.getRow(info)
  }

  /**
   * 根据条件查询
   * @param info
   * @returns {Promise<*>}
   */
  async getRows (info) {
    return await this.Model.getRows(info)
  }

  /**
   * 自定义sql
   * @param sql
   * @returns {Promise<*>}
   */
  async query (sql) {
    return await this.Model.query(sql)
  }
}

module.exports = BaseAction
