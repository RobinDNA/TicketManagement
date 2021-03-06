﻿'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var promotionId = null;

router.get('/', function (req, res, next) {
    console.log('current page: tickethistory.ejs');
    console.log('p1:' + req.query.p1);
    promotionId = req.query.p1;
    //尝试获取session中的user，如果存在，说明已登录，直接使用
    if (req.currentUser) {
        // 如果已经登录，发送当前登录用户信息。 
        res.render('tickethistory', { 'cellphoneNum': '' });
    } else {
        // 没有登录，跳转到登录页面。
        res.redirect('/login');
    }
    //res.render('usersmanagement', { 'cellphoneNum': '' });
});

router.post('/', function (req, res, next) {
    console.log('current page:tickethistory.ejs');
    console.log('req:' + req.body);

    var cellphoneNum = req.body.inputCellphoneNum;
    var userPassword = req.body.inputPassword;
    var email = req.body.inputEmail;
    var companyName = req.body.inputCompanyName;
    var organizationCode = req.body.inputProjectDesc;

    var vote = req.body.btnVote;

    if (vote == 'sendSmsCode') {
        //发送短信
        res.render('tickethistory', null);
    }
    else if (vote == 'register') {
        //注册逻辑

        //注册成功
        res.redirect('/tickethistory?p1=' + promotionId);
    }

});

module.exports = router;