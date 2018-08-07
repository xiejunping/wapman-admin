const log4js = require('log4js')
const { formatError, formatRes } = require('./formatLog')

log4js.configure({
  appenders: {
    error: {
      type: 'file',
      category: 'errLogger',
      filename: __dirname + '/error/err.log',
      maxLogSize: 104800,
      backups: 100
    },
    response: {
      type: 'dateFile',
      category: 'resLogger',
      filename: __dirname + '/responses/',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100
    }
  },
  categories: {
    error: {appenders: ['error'], level: 'error'},
    response: {appenders: ['response'], level: 'info'},
    default: {appenders: ['response'], level: 'info'}
  },
  replaceConsole: true
})

const logger = {}
const errorLogger = log4js.getLogger('error')
const resLogger = log4js.getLogger('response')
const infoLogger = log4js.getLogger('info')

logger.errLogger = (ctx, error, resTime) => {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime))
  }
}

logger.resLogger = (ctx, resTime) => {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime))
  }
}

logger.info = (args) => {
  const a = args.shift()
  infoLogger.info(args.join('   '))
}

logger.console = str => {
  infoLogger.info(str)
}

logger.error = str => {
  errorLogger.error(str)
}

module.exports = logger
