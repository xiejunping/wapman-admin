


/**
 * 配置文件
 * @type {{port: string, privateSession: string}}
 */

const dev = {
  host: 'localhost',
  port: '3000',
  privateSession: 'SESSIONID', // koa-seeeion
  errLogin: 180,
  codeExpire: 30,
  codeValid: 5,
  sessionExprie: 1440
}

const prod = {
  host: '127.0.0.1',
  port: '4000',
  privateSession: 'CoinFun',

  provider: 'ws://127.0.0.1:8546',
  // provider: 'https://ropsten.infura.io/QJkBcaA4RyB8eIjjQWEK',
  providerAccount: '0xfBE7260D71C389F0ac3C7B54283ACF83Def3cB9B',
  providerKey: '0xb3a5a326b91c58a1c01577e72de0b1558dd03ac26d5538549b2c068c1102009e',

  ratio: 10000,
  minWithDraw: 0.001,
  minPick: 0.3,
  person: 30,
  give: 15,
}

module.exports = process.env.NODE_ENV === 'production' ? prod : dev
