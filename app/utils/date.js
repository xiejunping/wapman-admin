const moment = require('moment')

class DateFmt {
  constructor () {

  }

  now () {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }


}

module.exports = new DateFmt()
