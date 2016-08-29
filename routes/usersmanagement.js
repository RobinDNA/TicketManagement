'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var promotionId = null;

router.get('/', function (req, res, next) {
    console.log('current page: usersmanagement.ejs');
    console.log('p1:' + req.query.p1);
    promotionId = req.query.p1;
    //尝试获取session中的user，如果存在，说明已登录，直接使用
    //if (req.currentUser) {

    //    // 如果已经登录，发送当前登录用户信息。 
    //    res.render('usersmanagement', { 'cellphoneNum': '' });
    //} else {
    //    // 没有登录，跳转到登录页面。
    //    res.redirect('/login');
    //}

    var queryUser = new AV.Query('_User');
    queryUser.notEqualTo('MemberType', '3');
    queryUser.find().then(function (results) {
        res.locals.userItems = results;
        var userItems = results;

        console.log('userItems:' + userItems);
        console.log('userItems[0].get("username"):' + userItems[0].get('username'));
        console.log('userItems[0].get("id"):' + userItems[0].get('id'));

        res.render('usersmanagement', {});
    }, function (error) {
        console.log(error.code + ':' + error.message);
    });
});

router.post('/', function (req, res, next) {
    console.log('current page:usersmanagement.ejs');
    console.log('req:' + req.body);

    var vote = req.query.vote;
    console.log("vote:" + vote);
    var userId = req.query.id;
    console.log("userId:" + userId);

    if (vote == 'pass') {
        //审核
        if (userId != null && userId != '')
        {
            var query = new AV.Query('_User');
            query.get(userId).then(function (userData) {
                // 成功获得实例
                // data 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
                var person = userData;
                person.set('')

                person.set('MemberStatus', '2');
                person.save().then(function (personData) {
                    res.json({ verification: 'true', errMsg: errMsg });
                }, function (error)
                {
                    //审核失败。
                    var errMsg = err.code + ':' + err.message;
                    errMsg = '审核失败。(' + errMsg + ")";
                    console.log(errMsg);
                    res.json({ operation:'pass', verification: 'false', errMsg: errMsg });
                });

            }, function (error) {
                // 失败了
                
            });
        }
        
    }
    if (vote == 'detail') {
        //查看详细信息
        //审核
        if (userId != null && userId != '') {
            var query = new AV.Query('_User');
            query.get(userId).then(function (userData) {
                // 成功获得实例
                // data 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
                var person = userData;
                res.json({ operation: 'detail', detailData: person, errMsg: errMsg });

            }, function (error) {
                // 失败了

            });
        }
    }
    if (vote == 'sendSMS') {
        //发送短信
        var cellphoneNums = req.body.inputCellphoneNums;
        var smsContent = req.body.inputSMSContent;

    }

});

module.exports = router;