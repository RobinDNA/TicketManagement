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
    console.log('req.body.inputVerificationCode:' + req.body.inputVerificationCode);
    console.log('req.body.inputPassword:' + req.body.inputPassword);
    console.log('req.body.inputPasswordAgain:' + req.body.inputPasswordAgain);
    console.log('req.body.inputCompanyName:' + req.body.inputCompanyName);
    console.log('req.body.inputEmail:' + req.body.inputEmail);
    console.log('req.body.inputOrganizationCode:' + req.body.inputOrganizationCode);
    console.log('promotionId:' + promotionId);

    var cellphoneNum = req.body.inputCellphoneNum;
    var verificationCode = req.body.inputVerificationCode;
    var userPassword = req.body.inputPassword;
    var userPasswordAgain = req.body.inputPasswordAgain;
    var companyName = req.body.inputCompanyName;
    var email = req.body.inputEmail;
    var organizationCode = req.body.inputOrganizationCode;

    var vote = req.body.btnVote;

    if (vote == 'sendSmsCode') {
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
    else if (vote == 'register') {
        console.log('进入注册');
        AV.Cloud.verifySmsCode(verificationCode, cellphoneNum).then(function () {
            //验证码正确
            console.log('验证码校验正确。');
            //注册逻辑
            var user = new AV.User();
            user.set("username", cellphoneNum);
            user.set("password", userPassword);
            user.set("email", email);
            user.set("CompanyName", companyName);            
            user.set("OrganizationCode", organizationCode);
            user.signUp().then(function (user) {
                res.saveCurrentUser(user);
                //注册成功
                res.render('/promotiondetail', {'p1' : promotionId});
            }, function (err) {
                console.log('注册失败:' + err.code + ' : ' + err.message);
                var errMsg = '注册失败:' + err.code + ' : ' + err.message;
                res.render('/register', { 'errMsg': errMsg });
            }).catch(next);
        }, function (error) {
            // 验证码错误，验证失败
            console.log('验证码错误');
            res.render('/register', { 'errMsg': JSON.stringify(error) + '验证码错误。' });
            }
            );

    }

});

module.exports = router;