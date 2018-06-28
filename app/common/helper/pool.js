const mysql = require('mysql')
const config = require('../config/mysql')

class Pool {
  constructor() {
    this.pool = this.init()
  }

  init() {
    return mysql.createPool(config)
  }
}

module.exports = new Pool(config)
