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
    var errMsg = req.query.errMsg;

    res.render('login', {errMsg: errMsg});
});

router.post('/', function (req, res, next) {
    console.log('current page:login.ejs');
    console.log('req:' + req.body);
    console.log('req.body.inputCellphoneNum:' + req.body.inputCellphoneNum);
    console.log('req.body.inputPassword:' + req.body.inputPassword);
    console.log('promotionId:' + promotionId);
           
    var vote = req.body.btnVote;
    if (vote == 'login') {
        var cellphoneNum = req.body.inputCellphoneNum;
        var userPassword = req.body.inputPassword;
        var isLoginSuccess = false;
        //user login
        AV.User.logIn(cellphoneNum, userPassword).then(function (user) {
            //login successfully
            res.saveCurrentUser(user);

            //if user is adminstrator 
            if (cellphoneNum == '18930615208') {
                res.redirect('/usersmanagement');
            }

        }, function (err) {
            var errMsg = err.code + ':' + err.message;
            res.locals.errMsg = errMsg;
            if(promotionId != null)
            {
                res.locals.p1 = promotionId;                
            }
            //res.redirect('/login?p1=' + promotionId + '&errMsg=' + JSON.stringify(err));
            res.render('login', {});
        }).catch(next);
    }
    else {
        res.redirect('/register?p1=' + promotionId);
    }
    
});

module.exports = router;