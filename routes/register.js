'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var promotionId = null;

router.get('/', function (req, res, next) {
    console.log('p1:' + req.query.p1);
    promotionId = req.query.p1;
    res.render('register', { 'cellphoneNum': '' });
});

router.post('/', function (req, res, next) {
    console.log('current page:register.ejs');
    console.log('req:' + req.body);
    console.log('req.body.inputCellphoneNum:' + req.body.inputCellphoneNum);
    console.log('req.body.inputPassword:' + req.body.inputPassword);
    console.log('promotionId:' + promotionId);

    var cellphoneNum = req.body.inputCellphoneNum;
    var userPassword = req.body.inputPassword;
    var verificationCode = req.body.inputVerificationCode;
    var email = req.body.inputEmail;
    var companyName = req.body.inputCompanyName;    
    var organizationCode = req.body.inputOrganizationCode;    

    var vote = req.body.btnVote;

    if (vote == 'sendSmsCode')
    {
        //发送短信
        AV.Cloud.requestSmsCode(cellphoneNum).then(function () {
            //发送成功
            console.log('向手机' + cellphoneNum + '发送验证码短信成功。');
        }, function (err) {
            //发送失败
            console.log('向手机' + cellphoneNum + '发送验证码短信失败。' + JSON.stringify(err));
        });
        res.render('register', { 'cellphoneNum': cellphoneNum });
    }
    else if (vote == 'register')
    {
        AV.Cloud.verifySmsCode(cellphoneNum, verificationCode).then(function (success) {
            //验证码正确

            //注册逻辑
            var user = new AV.User();
            user.set("username", cellphoneNum);
            user.set("password", userPassword);
            user.set("CompanyName", companyName);
            user.set("OrganizationCode", organizationCode);
            user.signUp().then(function (user) {
                res.saveCurrentUser(user);
                //注册成功
                res.redirect('/promotiondetail?p1=' + promotionId);
            }, function (err) {
                res.redirect('/users/register?errMsg=' + JSON.stringify(err));
            }).catch(next);
        }, function (error) {
            // 验证码错误，验证失败
            res.redirect('/users/register?errMsg=' + JSON.stringify(err)+ '验证码错误。');
        });
        
    }
    
});

module.exports = router;