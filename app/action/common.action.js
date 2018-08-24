const SMS = require('../controllers/sms');
const RD = require('../common/helper/redis');
const api = require('../common/helper/api');
const utils = require('../utils/index');
const logger = require('../controllers/logger');

const { codeExpire } = require('../common/config/server');
const { appid, secret } = require('../common/config/weixin');

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
      logger(err);
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
      logger(err);
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
      logger(err);
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
      logger(err);
    }
  },
  /**
   * 微信access_token
   * @param code
   * @returns {Promise<*>}
   */
  getAccessToken: async (code) => {
    const url = 'https://api.weixin.qq.com/sns/oauth2/access_token';

    try {
      return await api.fetch(url, { appid, secret, code, grant_type: 'authorization_code' });
    } catch (err) {
      logger(err);
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
      logger(err);
    }
  }
};

module.exports = commonControl;
