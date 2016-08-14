var checkSessionUser = function (req, res, next) {
    //尝试获取session中的user，如果存在，说明已登录，直接使用
    if (req.session.user) {
        next()
    } else {
        res.render('login')
    }
}

module.exports = checkSessionUser