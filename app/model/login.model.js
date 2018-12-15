const logger = require('../controllers/logger')

/**
 * 登录相关的数据库操作
 * @param DB
 */
const login = DB => {

  return {
    /**
     * 插入记录
     * @param info
     * @returns {Promise<*>}
     */
    async add (info) {
      try {
        return res = await DB.insert(info);
      } catch (err) {
        logger.error(err)
      }
    }
  };
}

module.exports = login;
