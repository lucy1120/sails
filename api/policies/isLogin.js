module.exports = function (req, res, proceed) {
    if (req.session.userId) {//如果会话有userId，就可以登录
      return proceed();
    }
    return res.redirect('/admin/login');
  };
  