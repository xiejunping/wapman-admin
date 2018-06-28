const QcloudSms = require('qcloudsms_js');
const { codeValid } = require('../common/config/server')
const { appId, appKey, smsSign, templateId } = require('../common/config/sms')
const logger = require('./logger');

class SMS {
  constructor (appId, appKey, sign, templateId) {
    this.AppID = appId;
    this.AppKey = appKey;
    this.smsSign = sign;
    this.templateId = templateId;

    this.sms = QcloudSms(this.AppID, this.AppKey);
  }

  /**
   * 同步发送短信
   * @param phone 手机号
   * @param params 参数{1}\{2}
   * @param template 模版id
   * @returns {Promise<any>}
   */
  _sendWithParam (phone, params, template) {
    const ssender = this.sms.SmsSingleSender();
    return new Promise((resolve, reject) => {
      ssender.sendWithParam(86, phone, template, params, this.smsSign, '', '', function (err, res, resData) {
        if (err) reject(err)
        else resolve(resData)
      })
    })
  }

  /**
   * 自定义短信
   * @param phone
   * @param msg
   * @returns {Promise<any>}
   * @private
   */
  _send (phone, msg) {
    const ssender = this.sms.SmsSingleSender();
    return new Promise((resolve, reject) => {
      ssender.send(0, 86, phone, msg, '', '', function (err, res, resData) {
        if (err) reject(err)
        else resolve(resData)
      })
    })
  }

  // 单发短信
  async _singleSender (phone, code, expire, templateId) {
    try {
      const params = [code, expire]
      return await this._sendWithParam(phone, params, templateId)
    } catch (err) {
      logger(`sms_err: ${err}`)
    }
  }

  // 报警
  async _warnSender (phone, msg) {
    try {
      return await this._send(phone, msg)
    } catch (err) {
      logger(`sms_err: ${err}`)
    }
  }

  // 登陆时短信
  async smsLogin (phone, code) {
    return await this._singleSender(phone, code, codeValid, this.templateId[0])
  }

  // 找回密码
  async smsPass (phone, code) {
    return await this._singleSender(phone, code, codeValid, this.templateId[1])
  }

  // 验证用户
  async smsCheck (phone, code) {
    return await this._singleSender(phone, code, codeValid, this.templateId[2])
  }

  // 短信提醒
  async smsWarn (phone, msg) {
    return await this._warnSender(phone, msg)
  }
}

module.exports = new SMS(appId, appKey, smsSign, templateId)
