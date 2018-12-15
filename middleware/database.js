const RD = require('../app/common/helper/redis');
const Pool = require('../app/common/helper/pool')
const logger = require('../app/controllers/logger')

const database = app => {
  const client = RD.init();
  const pool = Pool.init();

  // 建立连接打印信息
  pool.getConnection((error, connection) => {
    if (error) logger.console(`Mysql Connected failed`)
    else if(connection) logger.console(`Mysql Connected to MongoDB`)
  })

  client.on('connect', () => {
    logger.console(`Redis connect Successful`)
  })

  client.on('error', (err) => {
    logger.console(`Redis throw Error: ${err}`)
  })
}

module.exports = database
