const rules = {
  '/code/login': [
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'}],
  '/code/check': [
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'}],
  '/code/pass': [
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'}],
  '/phone/check': [
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'}],
  '/phone/check/code': [
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'},
    {name: 'code', require: true, min: 6, max: 6, desc: '验证码'}],
  '/user/name': [
    {name: 'username', require: true, min: 3, max: 20, desc: '账号'}],
  '/user/login': [
    {name: 'username', require: true, min: 3, max: 20, desc: '账号'},
    {name: 'password', require: true, min: 6, max: 20, desc: '密码'}],
  '/user/register': [
    {name: 'username', require: true, min: 3, max: 20, desc: '账号'},
    {name: 'password', require: true, min: 6, max: 20, desc: '密码'},
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'},
    {name: 'code', require: true, min: 6, max: 6, desc: '验证码'}],
  '/user/reset/pass': [
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'},
    {name: 'password', require: true, min: 6, max: 20, desc: '新密码'}],
  '/user/change/phone': [
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '绑定手机号'},
    {name: 'code', require: true, min: 6, max: 6, desc: '验证码'}],
  '/user/modify/pass': [
    {name: 'password', require: true, min: 6, max: 20, desc: '原密码'},
    {name: 'newpass', require: true, min: 6, max: 20, desc: '新密码'}],
  '/user/info/set': [
    {name: 'nickname', min: 0, max: 20, desc: '昵称'},
    {name: 'qq', min: 0, max: 20, desc: 'QQ'},
    {name: 'email', min: 0, max: 20, desc: '邮箱'},
    {name: 'sex', min: 0, max: 20, desc: '性别'}],
  '/user/update/avatar': [
    {name: 'avatar', require: true, min: 0, max: 22500000000, desc: '头像'}]
};

module.exports = rules;
