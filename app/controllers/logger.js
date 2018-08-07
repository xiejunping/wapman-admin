const log4js = require('../../bin/logs/log4js');

const dev = (str) => {
  console.log(str)
}

const prod = (str) => {
  log4js.console(str)
}

module.exports = process.env.NODE_ENV === 'production' ? prod : dev
