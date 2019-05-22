const sha1 = require('sha1');
const SMS = require('../controllers/sms');
const RD = require('../common/helper/redis');
const api = require('../common/helper/api');
const utils = require('../utils/index');
const logger = require('../controllers/logger');

const { codeExpire } = require('../common/config/server');
const { appid, secret, token, redirectUrl, takenUrl, authUrl } = require('../common/config/weixin');

const commonControl = {
  /**
   * 发送登录、注册验证码
   * @param phone
   * @returns {Promise<*>}
   */
  sendCodeLogin: async (phone) => {
    const code = utils.randomNumber(6);
    await RD.set(phone, code);
    await RD.pexpireat(phone, Date.parse(new Date()) + codeExpire * 60000)

    try {
      return process.env.NODE_ENV === 'production' ? await SMS.smsLogin(phone, code) : {result: 0};
    } catch (err) {
      logger.error(err);
    }
  },
  /**
   * 发送找回密码验证码
   * @param phone
   * @returns {Promise<*>}
   */
  sendCodePass: async (phone) => {
    const code = utils.randomNumber(6);
    await RD.set(phone, code);
    await RD.pexpireat(phone, Date.parse(new Date()) + codeExpire * 60000)

    try {
      return process.env.NODE_ENV === 'production' ? await SMS.smsPass(phone, code) : {result: 0};
    } catch (err) {
      logger.error(err);
    }
  },
  /**
   * 发送验证手机号验证码
   * @param phone
   * @returns {Promise<*>}
   */
  sendCodeCheck: async (phone) => {
    const code = utils.randomNumber(6);
    await RD.set(phone, code);
    await RD.pexpireat(phone, Date.parse(new Date()) + codeExpire * 60000)

    try {
      return process.env.NODE_ENV === 'production' ? await SMS.smsCheck(phone, code) : {result: 0};
    } catch (err) {
      logger.error(err);
    }
  },
  /**
   * 生成短链接
   * @param address
   * @returns {Promise<*>}
   */
  creatShortURL: async (address) => {
    const url = 'https://api.weibo.com/2/short_url/shorten.json';
    const headers = {
      referer: 'https://api.weibo.com',
      host: 'api.weibo.com'
    };

    try {
      return await api.referer(url, headers, { source: 2849184197, url_long: address });
    } catch (err) {
      logger.error(err);
    }
  },
  /**
   * 微信验证服务
   * @param timestamp
   * @param nonce
   * @returns {Promise<*>}
   */
  checkSignature: async (timestamp, nonce) => {
    let str = [token, timestamp, nonce].sort().join('');
    return sha1(str);
  },
  getStartUrl: async (state) => {
    let url = takenUrl;

    url = url.replace('APPID', appid)
    url = url.replace('REDIRECT_URI', encodeURIComponent(redirectUrl))
    url = url.replace('SCOPE', 'snsapi_login')
    url = url.replace('STATE', state)
    return url
  },
  /**
   * 微信access_token
   * @param code
   * @returns {Promise<*>}
   */
  getAccessToken: async (code) => {
    let url = authUrl;

    url = url.replace('APPID', appid)
    url = url.replace('SECRET', secret)
    url = url.replace('CODE', code)
    try {
      return await api.fetch(url);
    } catch (err) {
      logger.error(err);
    }
  },
  /**
   * 取微信个人信息
   * @param access_token
   * @param openid
   * @returns {Promise<void>}
   */
  getUserInfo: async (access_token, openid) => {
    const url = 'https://api.weixin.qq.com/sns/userinfo';

    try {
      return await api.fetch(url, { access_token, openid });
    } catch (err) {
      logger.error(err);
    }
  }
};

module.exports = commonControl;
