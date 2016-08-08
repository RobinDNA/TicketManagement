'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var promotionId = null;
var promotionCode = null;
var cellphoneNum = null;

router.get('/', function (req, res, next) {
    console.log('p1:' + req.query.p1);
    promotionId = req.query.p1;
    //retrieve promotion detail information from database
    var promotionTitle = '试用激活码';
    var promotionContent = '此激活码有效期至2016年12月31日。';
    var cellphoneNum = '18930615208';

    res.render('promotiondetail', {
        'promotionId': promotionId,
        'promotionTitle': promotionTitle,
        'promotionContent': promotionContent
    });
});

router.post('/', function (req, res, next) {

    console.log('current page:promotiondetail.ejs');
    console.log('req:' + req.body);
    
     //发送短信
    //todo
    
    res.redirect('/');
});

module.exports = router;