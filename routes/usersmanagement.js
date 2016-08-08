'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var promotionId = null;

router.get('/', function (req, res, next) {
    console.log('p1:' + req.query.p1);
    promotionId = req.query.p1;
    res.render('usersmanagement', { 'cellphoneNum': '' });
});

router.post('/', function (req, res, next) {
    console.log('current page:usersmanagement.ejs');
    console.log('req:' + req.body);

    var cellphoneNum = req.body.inputCellphoneNum;
    var userPassword = req.body.inputPassword;
    var email = req.body.inputEmail;
    var companyName = req.body.inputCompanyName;
    var organizationCode = req.body.inputOrganizationCode;

    var vote = req.body.btnVote;

    if (vote == 'sendSmsCode') {
        //发送短信
        res.render('usersmanagement', { 'cellphoneNum': cellphoneNum });
    }
    else if (vote == 'register') {
        //注册逻辑

        //注册成功
        res.redirect('/usersmanagement?p1=' + promotionId);
    }

});

module.exports = router;