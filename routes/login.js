'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var TicketUser = AV.Object.extend('TicketUser');

var promotionId = null;

router.get('/', function (req, res, next) {
    console.log('p1:' + req.query.p1);
    promotionId = req.query.p1;    
    res.render('login', null);
});

router.post('/', function (req, res, next) {

    console.log('req:' + req.body);
    console.log('req.body.inputCellphoneNum:' + req.body.inputCellphoneNum);
    console.log('req.body.inputPassword:' + req.body.inputPassword);

    var cellphoneNum = req.body.inputCellphoneNum;
    var userPassword = req.body.inputPassword;
        
    console.log("cellphoneNum:"+ cellphoneNum);
    console.log("userPassword:"+ userPassword);
    

    res.render('login', {
        title: 'TODO 列表',
        todos: false
    });
});



// 查询 Todo 列表
/*
router.get('/', function (req, res, next) {
    var query = new AV.Query(Todo);
    query.descending('createdAt');
    query.find().then(function (results) {
        res.render('todos', {
            title: 'TODO 列表',
            todos: results
        });
});
    }, function (err) {
        if (err.code === 101) {
            // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
            // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
            res.render('todos', {
                title: 'TODO 列表',
                todos: []
            });
        } else {
            next(err);
        }
    }).catch(next);
});

*/
// 新增 Ticket User 项目
/*
router.post('/', function (req, res, next) {
    var content = req.body.content;
    var tickerUser = new TicketUser();
    tickerUser.set('content', content);
    tickerUser.save().then(function (login) {
        res.redirect('/login');
    }).catch(next);
*/
module.exports = router;