const logger = require('../controllers/logger');

const model = DB => {

  return {
    async add(info) {
      try {
        return res = await DB.insert(info)
      } catch (err) {
        logger.error(err)
      }
    },
    async update(id, info) {
      try {
        return res = await DB.update({id}, info)
      } catch (err) {
        logger.error(err)
      }
    },
    async delete(id) {
      try {
        return res = await DB.remove({id})
      } catch (err) {
        logger.error(err)
      }
    },
    async getInfoByJson (info) {
      try {
        return res = await DB.fetchRow(info)
      } catch (err) {
        logger.error(err)
      }
    },
    async getRows (info) {
      try {
        return res = await DB.fetchRows(info)
      } catch (err) {
        logger.error(err)
      }
    },
    async getAll(sql) {
      try {
        return res = await DB.queryStr(sql)
      } catch (err) {
        logger.error(err)
      }
    },
    async fetchAll(info) {
      try {
        const {tableName, selectStr = '*', whereJson, orderByJson = '', limitArr = ''} = info
        return res = await DB.fetchAll(tableName, selectStr, whereJson, orderByJson, limitArr)
      } catch (err) {
        logger.error(err)
      }
    }
  }
}

module.exports = model;
