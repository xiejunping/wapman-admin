const Pool = require('./pool');
const pool = Pool.init();

/**
 * 数据库模型
 */
class DB {
  /**
   * 构造方法
   */
  constructor(tableName) {
    this.tableName = tableName;
    this.pool = pool;
  }

  /**
   * 数据查询接口
   * @param tableName
   * @param idJson
   * @returns {Promise<any>}
   */
  fetchRow(idJson) {
    const { tableName, pool } = this
    return new Promise((resolve, reject) => {
      const sqlMod = `SELECT * FROM ${tableName} WHERE ?`
      pool.query(sqlMod, idJson, function(error, results) {
        if (error) {
          reject(error)
        } else {
          if (results) {
            resolve(results.pop())
          } else {
            resolve(results)
          }
        }
      })
    })
  }

  /**
   * 取数据集合
   * @param idJson
   * @returns {Promise<any>}
   */
  fetchRows(idJson) {
    const { tableName, pool } = this
    return new Promise((resolve, reject) => {
      const sqlMod = `SELECT * FROM ${tableName} WHERE ?`
      pool.query(sqlMod, idJson, function (error, results) {
        if (error) {
          reject(error)
        } else resolve(results)
      })
    })
  }

  /**
   * 数据插入接口
   * @param tableName
   * @param rowInfo
   * @returns {Promise<any>}
   */
  insert(rowInfo) {
    const { tableName, pool } = this
    return new Promise((resolve, reject) => {
      const sqlMod = `INSERT INTO ${tableName} SET ?`
      pool.query(sqlMod, rowInfo, function(error, result) {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  /**
   * 数据修改接口
   * @param tableName
   * @param idJson
   * @param rowInfo
   * @returns {Promise<any>}
   */
  update(idJson, rowInfo) {
    const { tableName, pool } = this
    return new Promise((resolve, reject) => {
      const sqlMod = `UPDATE ${tableName} SET ? WHERE ?`
      pool.query(sqlMod, [rowInfo, idJson], function (error, result) {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  /**
   * 数据删除接口
   * @param tableName
   * @param idJson
   * @returns {Promise<any>}
   */
  remove(idJson) {
    const { tableName, pool } = this
    return new Promise((resolve, reject) => {
      const sqlMod = `DELETE FROM ${tableName} WHERE ?`
      pool.query(sqlMod, idJson, function (error, result) {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  /**
   * 统计
   * @param idJson
   * @returns {Promise<any>}
   */
  count(idJson) {
    const { tableName, pool } = this
    return new Promise((resolve, reject) => {
      const sqlMod = `SELECT COUNT(*) as count FROM ${tableName} WHERE ?`
      pool.query(sqlMod, idJson, function (error, result) {
        if (error) reject(error)
        else resolve(result.pop())
      })
    })
  }

  /**
   * 自定义查询
   * @param sql
   * @returns {Promise<any>}
   */
  queryStr(sqlMod) {
    const { pool } = this
    return new Promise((resolve, reject) => {
      pool.query(sqlMod, function (error, result) {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }

  /**
   * 复合查询
   * @param tableName
   * @param whereJson
   * @param orderByJson
   * @param limitArr
   * @param selectStr
   * @returns {Promise<any>}
   */
  fetchAll(tableName, selectStr, whereJson, orderByJson = '', limitArr = '') {
    const andWhere = whereJson['and']
    const orWhere = whereJson['or']
    const betArr = whereJson['between']
    const andArr = []
    const orArr = []

    for(const key in andWhere) {
      const snap = typeof andWhere[key] === 'string' ? '\"' : ''
      andArr.push(`\`${key}\` = ${snap}${andWhere[key]}${snap}`)
    }
    for(const key in orWhere) {
      const snap = typeof andWhere[key] === 'string' ? '\"' : ''
      orArr.push(`\`${key}\` = ${snap}${orWhere[key]}${snap}`)
    }

    const andStr = andArr.join(' and ')
    const orStr = orArr.join(' or ')
    const betStr = betArr ? `AND ${betArr[0]} BETWEEN ${betArr[1]} AND ${betArr[2]}` : ''

    const orderStr = orderByJson['type'] ? `order by ${orderByJson['key']} ${orderByJson['type']}` : ''
    const limitStr = limitArr.length > 0 ? `limit ${limitArr.join(',')}` : ''
    const sqlMod = `SELECT ${selectStr} FROM ${tableName} WHERE ${andStr} ${orStr} ${betStr} ${orderStr} ${limitStr}`

    return new Promise((resolve, reject) => {
      pool.query(sqlMod, function (error, results) {
        if (error) {
          reject(error)
        } else resolve(results)
      })
    })
  }
}

module.exports = DB
