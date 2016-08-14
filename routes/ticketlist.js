'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象

router.get('/', function (req, res, next) {
    //尝试获取session中的user，如果存在，说明已登录，直接使用
    if (req.currentUser) {
        // 如果已经登录，发送当前登录用户信息。 
        res.render('ticketlist', null);
    } else {
        // 没有登录，跳转到登录页面。
        res.redirect('/login');
    }
    
});

router.post('/', function (req, res, next) {
    console.log('current page:ticketlist.ejs');
    console.log('req:' + req.body);

    res.render('ticketlist', null);
});

module.exports = router;