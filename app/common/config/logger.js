const path = require('path');

module.exports = {
  appenders: {
    error: {
      type: 'file',
      category: 'errLogger',
      filename: path.join(__dirname, '../../../bin/logs/error/err.log'),
      maxLogSize: 104800,
      backups: 100
    },
    response: {
      type: 'dateFile',
      category: 'resLogger',
      filename: path.join(__dirname, '../../../bin/logs/responses/'),
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
};
