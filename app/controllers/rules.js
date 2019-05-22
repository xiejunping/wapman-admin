const rules = {
  '/owner/check': [
    {name: 'signature', require: true, min: 4, max: 100, desc: '微信加密签名'},
    {name: 'nonce', min: 0, max: 100, desc: '随机数'},
    {name: 'timestamp', min: 0, max: 100, desc: '时间戳'},
    {name: 'echostr', min: 0, max: 100, desc: '随机字符串'}],
  '/weixin/register': [
    {name: 'code', require: true, min: 4, max: 100, desc: '微信获取CODE'},
    {name: 'status', min: 0, max: 100, desc: '自定义参数'}],
  '/url/short': [
    {name: 'address', require: true, min: 7, max: 255, desc: '链接地址'}],
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
  '/user/phone/login': [
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'},
    {name: 'code', require: true, min: 6, max: 6, desc: '验证码'}],
  '/user/register': [
    {name: 'username', require: true, min: 3, max: 20, desc: '账号'},
    {name: 'password', require: true, min: 6, max: 20, desc: '密码'},
    {name: 'phone', require: true, pattern: '0?(13|14|15|17|18|19)[0-9]{9}$', desc: '手机号'},
    {name: 'invite', min: 0, max: 6, desc: '邀请码'},
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
    {name: 'avatar', require: true, min: 0, max: 22500000000, desc: '头像'}],
  '/menu/add': [
    {name: 'pid', require: true, min: 1, max: 11, desc: '上级ID'},
    {name: 'name', min: 0, max: 20, desc: '路由名称'},
    {name: 'title',  min: 0, max: 20, desc: '菜单名称'},
    {name: 'path', min: 0, max: 20, desc: '菜单链接'},
    {name: 'icon', min: 0, max: 20, desc: '菜单图标'},
    {name: 'component', min: 0, max: 20, desc: '菜单组件'},
    {name: 'status', min: 0, max: 1, desc: '菜单状态'}
  ],
  '/menu/edit': [
    {name: 'id', require: true, min: 1, max: 11, desc: '菜单ID'},
    {name: 'pid', require: true, min: 1, max: 11, desc: '上级ID'},
    {name: 'name', min: 0, max: 20, desc: '路由名称'},
    {name: 'title',  min: 0, max: 20, desc: '菜单名称'},
    {name: 'path', min: 0, max: 20, desc: '菜单链接'},
    {name: 'icon', min: 0, max: 20, desc: '菜单图标'},
    {name: 'component', min: 0, max: 20, desc: '菜单组件'},
    {name: 'status', min: 0, max: 1, desc: '菜单状态'}
  ],
  '/dept/add': [
    {name: 'pid', require: true, min: 1, max: 11, desc: '上级ID'},
    {name: 'name', min: 0, max: 20, desc: '分组名称'},
    {name: 'status', min: 0, max: 1, desc: '分组状态'}
  ],
  '/dept/edit': [
    {name: 'id', require: true, min: 1, max: 11, desc: '菜单ID'},
    {name: 'pid', require: true, min: 1, max: 11, desc: '上级ID'},
    {name: 'name', min: 0, max: 20, desc: '分组名称'},
    {name: 'status', min: 0, max: 1, desc: '分组状态'}
  ],
  '/role/': [
    {name: 'gid', min: 1, max: 11, desc: '角色分组ID'},
    {name: 'pageIndex', min: 1, desc: '当前页码'},
    {name: 'pageSize', min: 1, desc: '分页大小'}
  ],
  '/role/add': [
    {name: 'gid', require: true, min: 1, max: 11, desc: '角色分组ID'},
    {name: 'name',  min: 0, max: 20, desc: '角色名称'},
    {name: 'status', min: 0, max: 1, desc: '角色状态'}
  ],
  '/role/edit': [
    {name: 'id', require: true, min: 1, max: 11, desc: '角色ID'},
    {name: 'gid', require: true, min: 1, max: 11, desc: '角色分组ID'},
    {name: 'name',  min: 0, max: 20, desc: '角色名称'},
    {name: 'status', min: 0, max: 1, desc: '角色状态'}
  ],
  '/access/add': [
    {name: 'pid', require: true, min: 1, max: 11, desc: '权限上级ID'},
    {name: 'mid', require: true, min: 1, max: 11, desc: '菜单ID'},
    {name: 'type', min: 1, desc: '权限类型'},
    {name: 'name', min: 0, max: 20, desc: '权限名称'},
    {name: 'urls', min: 1, max: 20, desc: '权限路径'},
    {name: 'status', min: 0, max: 1, desc: '权限状态'}
  ],
  '/access/edit': [
    {name: 'id', require: true, min: 1, max: 11, desc: '权限ID'},
    {name: 'pid', require: true, min: 1, max: 11, desc: '权限上级ID'},
    {name: 'mid', require: true, min: 1, max: 11, desc: '菜单ID'},
    {name: 'type', min: 1, desc: '权限类型'},
    {name: 'name',  min: 0, max: 20, desc: '权限名称'},
    {name: 'urls', min: 1, max: 20, desc: '权限路径'},
    {name: 'status', min: 0, max: 1, desc: '权限状态'}
  ]
};

module.exports = rules;
