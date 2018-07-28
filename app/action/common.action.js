const SMS = require('../controllers/sms');
const RD = require('../common/helper/redis');
const utils = require('../utils/index');
const logger = require('../controllers/logger');

const { codeExpire } = require('../common/config/server');

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
  }
};

module.exports = commonControl;
