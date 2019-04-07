const Model = require('./base.model.class')
const logger = require('../controllers/logger')

class RoleModel extends Model {

  constructor (DB) {
    super(DB)
  }

  async fetchAll (info) {
    try {
      const {tableName, selectStr = '*', whereJson, orderByJson = '', limitArr = ''} = info
      return await this.DB.fetchAll(tableName, selectStr, whereJson, orderByJson, limitArr)
    } catch (err) {
      logger.error(err)
    }
  }
}

module.exports = RoleModel
