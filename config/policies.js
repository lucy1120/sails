module.exports.policies = {
  AdminController: {
    '*': 'isLogin',
    'login': true,
    'logined': true,
    'getYzm':true,
    'register':true,
    'writeInfo':true
  }
}
