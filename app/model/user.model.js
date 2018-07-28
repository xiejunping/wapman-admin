const logger = require('../controllers/logger')

/**
 * 用户相关的数据库操作
 * @param DB
 */
const user = DB => {

  return {
    async add(info) {
      try {
        return res = await DB.insert(info)
      } catch (err) {
        logger(err)
      }
    },
    async update(id, info) {
      try {
        return res = await DB.update({id}, info)
      } catch (err) {
        logger(err)
      }
    },
    async getByUserId(id) {
      try {
        return res = await DB.fetchRow({id})
      } catch (err) {
        logger(err)
      }
    },
    async getInfoByJson(info) {
      try {
        return res = await DB.fetchRow(info)
      } catch (err) {
        logger(err)
      }
    },
    async updateScore(sql) {
      try {
        return res = await DB.queryStr(sql)
      } catch (err) {
        logger(err)
      }
    },
    async getRowsByJson(where) {
      try {
        return res = await DB.fetchAll(where)
      } catch (err) {
        logger(err)
      }
    }
  }
};

module.exports = user;
