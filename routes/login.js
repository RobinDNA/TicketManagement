'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象

var promotionId = null;

router.get('/', function (req, res, next) {
    console.log('current page:login.ejs');
    console.log('p1:' + req.query.p1);
    promotionId = req.query.p1;

    res.render('login', {});
});

router.post('/', function (req, res, next) {
    console.log('current page:login.ejs');
    console.log('req:' + req.body);
    console.log('req.body.inputCellphoneNum:' + req.body.inputCellphoneNum);
    console.log('req.body.inputPassword:' + req.body.inputPassword);
    console.log('promotionId:' + promotionId);
           
    var vote = req.query.vote;
    var isLoginSuccess = null;
    var locationUrl = null;
    if (vote == 'login') {
        var cellphoneNum = req.body.inputCellphoneNum;
        var userPassword = req.body.inputPassword;
        isLoginSuccess = false;
        
        //user login
        AV.User.logIn(cellphoneNum, userPassword).then(function (user) {
            //login successfully
            res.saveCurrentUser(user);
            isLoginSuccess = true;
            //if user is adminstrator 
            if (cellphoneNum == '18930615208' || cellphoneNum == '13761787729' || cellphoneNum == '13888888888') {
                locationUrl = '/usersmanagement';
            }
            else {
                locationUrl = '/';
            }
            res.json({ isLoginSuccess: isLoginSuccess, locationUrl: locationUrl });

        }, function (err) {
            isLoginSuccess = false;
            var errMsg = err.code + ':' + err.message;
            console.log(errMsg);
            res.json({ isLoginSuccess: isLoginSuccess, errMsg: "手机号/密码不正确。" });
        }).catch(next);
        
    }
    else {
        locationUrl = '/register';
        res.json({ isLoginSuccess: isLoginSuccess, locationUrl: locationUrl });
    }
    
});

module.exports = router;