'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var promotionId = null;

function addZero(num) {
    if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
        return '0' + Math.floor(num);
    } else {
        return num.toString();
    }
};

router.get('/', function (req, res, next) {
    console.log('p1:' + req.query.p1);
    promotionId = req.query.p1;
    res.locals.cellphoneNum = null;
    res.locals.errMsg = null;
    res.render('register', {});
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

    var vote = req.query.vote;
    console.log("vote:" + vote);
    if (vote == 'sendSmsCode') {
        //发送短信
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber: cellphoneNum,
            name: '众孵券码管理系统',
            op: '注册',
            ttl: 10
        }).then(function () {
            //发送成功
            console.log('向手机' + cellphoneNum + '发送验证码短信成功。');            
            res.send('发送验证码短信成功。');
        }, function (err) {
            //发送失败
            var errMsg = err.code + ':' + err.message;
            console.log('向手机' + cellphoneNum + '发送验证码短信失败。' + errMsg);           
            res.send('发送验证码短信失败。');
        });
    }
    else if (vote == 'register') {
        console.log('进入注册');
        if (verificationCode != '') {
            console.log('验证码不为空。');
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
                    var date = new Date();
                    res.locals.currentTime = date;
                    res.locals.masonryContentId = date.getFullYear()
                                        + addZero(date.getMonth() + 1)
                                        + addZero(date.getDay())
                                        + addZero(date.getHours())
                                        + addZero(date.getMinutes())
                                        + addZero(date.getSeconds())
                                        + addZero((parseInt(date.getMilliseconds() / 10)));
                    res.redirect('index', {});
                }, function (err) {
                    console.log('注册失败:' + err.code + ' : ' + err.message);
                    errMsg = '注册失败:' + err.code + ' : ' + err.message;
                    res.send(errMsg);
                }).catch(next);
                {                    
                    res.send('注册出错。');
                }
            }
        , function (error) {
            // 验证码错误，验证失败
            console.log('验证码错误');
            var errorMsg = '验证码错误:' + err.code + ' : ' + err.message;
            res.send(errorMsg);
        }
            );
        }
        else {
            console.log('验证码不能为空')
            var errorMsg = '验证码不能为空';
            res.send(errorMsg);
        }
    }

});

module.exports = router;