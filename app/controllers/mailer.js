const NodeMailer = require('nodemailer');
const { SERVICE, AUTH_ACCOUNT, AUTH_PASS, FROM } = require('../common/config/mail')
const logger = require('./logger');

class Mailer {
  constructor(SERVICE, AUTH_ACCOUNT, AUTH_PASS, FROM) {
    this.service = SERVICE;
    this.from = FROM;
    this.auth = {
      user: AUTH_ACCOUNT,
      pass: AUTH_PASS
    };

    this.Mailer = NodeMailer.createTransport({
      service: this.service,
      auth: this.auth
    })
  }

  async sendMail (to, subject, html) {
    const option = { from: this.from, to, subject, html }
    return new Promise((resolve, reject) =>{
      this.Mailer.sendMail(option, (error, info) => {
        if (error) {
          logger('')
          reject(error);
        } else {
          logger('')
          resolve(info)
        }
      })
    });
  }
}

module.exports = new Mailer(SERVICE, AUTH_ACCOUNT, AUTH_PASS, FROM);
