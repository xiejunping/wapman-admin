const logger = require('../controllers/logger')

/**
 * 登录相关的数据库操作
 * @param DB
 */
const unit = DB => {

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
        logger(err);
      }
    },
    /**
     * 测试事务
     * @returns {Promise<void>}
     */
    async ab () {
      const connection = await DB.getConnection();
      const task1 = (callback) => {
        const sqlMod = `INSERT INTO \`wap_unit\` SET \`name\` = \'积分\'`;
        DB.connectionQuery(connection, sqlMod, callback);
      };
      const task2 = (callback) => {
        const sqlMod = `INSERT INTO \`wap_unit\` SET \`name\` = \'游戏币\'`;
        DB.connectionQuery(connection, sqlMod, callback);
      };
      const task3 = (callback) => {
        const sqlMod = `INSERT INTO \`wap_unit\` SET \`name\` = \'房卡\'`;
        DB.connectionQuery(connection, sqlMod, callback);
      };

      DB.transaction(connection, [task1, task2, task3]).then((con) => {
        return DB.commit(con);
      }).then(con => {
        con.release();
      }).catch(err => {
        logger(err);
        DB.rollback(connection);
      });
    },
  };
}

module.exports = unit;
