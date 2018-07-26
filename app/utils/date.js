const moment = require('moment')

class DateFmt {
  constructor () {

  }

  now () {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }

  nowToName () {
    return moment().format('YYYYMMDDHHmmss')
  }
}

module.exports = new DateFmt()
