const dev = {
  appid: 'wxeb9294b7da15c1b7',
  secret: '5372c65efa93d36c28cb52f51b81ac15',
  token: 'amEQlniuKvibA7rzvsgq',
  redirectUrl: 'https://www.jsvue.cn/api/weixin/callback',

  takenUrl: 'https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect',
  authUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code'
};

const prod = {
  appid: 'wxeb9294b7da15c1b7',
  secret: '5372c65efa93d36c28cb52f51b81ac15',
  token: 'amEQlniuKvibA7rzvsgq',
  redirectUrl: 'https://www.jsvue.cn/api/weixin/callback',

  takenUrl: 'https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect',
  authUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code'
};

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;
