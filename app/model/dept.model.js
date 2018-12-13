const logger = require('../controllers/logger');

const dept = DB => {

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
    async delete(id) {
      try {
        return res = await DB.remove({id})
      } catch (err) {
        logger(err)
      }
    },
    async getInfoById (id) {
      try {
        return res = await DB.fetchRow({id})
      } catch (err) {
        logger(err)
      }
    },
    async getRows (info) {
      try {
        return res = await DB.fetchRows(info)
      } catch (err) {
        logger(err)
      }
    },
    async getAll(sql) {
      try {
        return res = await DB.queryStr(sql)
      } catch (err) {
        logger(err)
      }
    }
  }
}

module.exports = dept;