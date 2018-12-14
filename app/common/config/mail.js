const prod = {
  SERVICE: 'QQex',
  AUTH_ACCOUNT: 'noreply@jsvue.cn',
  AUTH_PASS: 'CJdhuSiAEzWXBgmh',

  FROM: '"VUE技术栈" <noreply@jsvue.cn>'
};
const dev = {
  SERVICE: 'QQex',
  AUTH_ACCOUNT: 'noreply@jsvue.cn',
  AUTH_PASS: 'CJdhuSiAEzWXBgmh',

  FROM: '"VUE技术栈" <noreply@jsvue.cn>'
};

module.exports = process.env.NODE_ENV === 'production' ? prod : dev
