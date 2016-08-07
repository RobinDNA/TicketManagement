'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` ����һ��Ҫ����ȫ�ֱ������������ɶ�ջ�����
// ����� https://leancloud.cn/docs/js_guide.html#����
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
        title: 'TODO �б�',
        todos: false
    });
});



// ��ѯ Todo �б�
/*
router.get('/', function (req, res, next) {
    var query = new AV.Query(Todo);
    query.descending('createdAt');
    query.find().then(function (results) {
        res.render('todos', {
            title: 'TODO �б�',
            todos: results
        });
});
    }, function (err) {
        if (err.code === 101) {
            // �ô������ϢΪ��{ code: 101, message: 'Class or object doesn\'t exists.' }��˵�� Todo ���ݱ�δ���������Է��ؿյ� Todo �б�
            // ����Ĵ�����������https://leancloud.cn/docs/error_code.html
            res.render('todos', {
                title: 'TODO �б�',
                todos: []
            });
        } else {
            next(err);
        }
    }).catch(next);
});

*/
// ���� Ticket User ��Ŀ
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