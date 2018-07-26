const crypto = require('crypto-js');
const { secret } = require('../common/config/server')

exports.md5 = (content) => {
  return crypto.HmacMD5(content, secret);
}

exports.aesDecrypt = (content) => {
  const bytes = crypto.AES.decrypt(content, secret);
  return bytes.toString(crypto.enc.Utf8);
}

exports.toBase64 = (content) => {
  return new Buffer(content).toString('base64');
}

exports.fromBase64 = (content) => {
  return new Buffer(content, 'base64').toString();
}
