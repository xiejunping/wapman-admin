const Mysql = require('../common/helper/mysql');
const RD = require('../common/helper/redis');
const SMS = require('../controllers/sms');
const COS = require('../controllers/cos');
const utils = require('../utils/index');
const logger = require('../controllers/logger');
const DB = new Mysql('wap_user');
const userModel = require('../model/user.model')(DB);

const { codeExpire, errLogin } = require('../common/config/server')

const userControl = {
  /**
   * 随机生成邀请码
   * @returns {Promise<void>}
   */
  createInviteCode: async () => {
    async function getInvite() {
      const invite = utils.randomNumber(6);
      const userInfo = await userModel.getInfoByJson({cid: invite});
      if (!!userInfo) {
        logger('生成邀请码重复存在: ' + invite);
        await getInvite();
      } else {
        return invite;
      }
    }

    // 递归生成邀请码
    return await getInvite();
  },
  sendCode: async (phone) => {
    const code = utils.randomNumber(6);
    await RD.set(phone, code);
    await RD.pexpireat(phone, Date.parse(new Date()) + codeExpire * 60000)

    try {
      return await SMS.smsLogin(phone, code);
    } catch (err) {
      logger(err);
    }
  },
  checkInfo: async (info) => {
    const row = await userModel.getInfoByJson(info);
    return !!row;
  },
  checkPass: async (name, password) => {
    const row = await userModel.getInfoByJson({name});
    if (Boolean(row)) {
      return row.password === password ? row : null;
    } else {
      logger(`验证密码时找不到用户信息：${name}`);
      return;
    }
  },
  /**
   * 是否锁住
   * @param name
   * @returns {Promise<boolean>}
   */
  isLoginLock: async (name) => {
    const val = await RD.get(name) || 0;
    return val >= 20;
  },
  /**
   * 登陆错误
   * @param name
   * @returns {Promise<number>}
   */
  setTimeRedis: async (name) => {
    let val = await RD.get(name) || 0;
    await RD.set(name, ++val);
    await RD.pexpireat(name, Date.parse(new Date()) + errLogin * 60000);
    return 1;
  },
  /**
   * 注册用户
   * @param info
   * @returns {Promise<*>}
   */
  registerUser: async (info) => {
    info = Object.assign({}, {
      email: '',
      sex: 0
    }, info);

    return await userModel.add(info);
  },
  uploadUserInfo: async (id, info) => {
    return await userModel.update(id, info);
  },
  getInfoById: async (id) => {
    return await userModel.getByUserId(id)
  },
  uploadFile: async (base64) => {
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = new Buffer(base64Data, 'base64');

    return await COS.uploadImg(dataBuffer);
  },
};

module.exports = userControl;
