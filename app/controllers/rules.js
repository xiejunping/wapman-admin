const rules = {
  '/user/code': [
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'}],
  '/user/check': [
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'}],
  '/user/name': [
    {name: 'username', require: true, min: 3, max: 20, desc: '账号'}],
  '/user/login': [
    {name: 'username', require: true, min: 3, max: 20, desc: '账号'},
    {name: 'password', require: true, min: 6, max: 20, desc: '密码'}],
  '/user/register': [
    {name: 'username', require: true, min: 3, max: 20, desc: '账号'},
    {name: 'password', require: true, min: 3, max: 20, desc: '密码'},
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'},
    {name: 'code', require: true, min: 6, max: 6, desc: '验证码'},
  ],
};

module.exports = rules;
