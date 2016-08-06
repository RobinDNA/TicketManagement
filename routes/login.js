'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` ����һ��Ҫ����ȫ�ֱ������������ɶ�ջ�����
// ����� https://leancloud.cn/docs/js_guide.html#����
var TicketUser = AV.Object.extend('TicketUser');

router.post('/', function (req, res, next) {
        res.render('login', {
            title: 'TODO �б�',
            todos: false
        });
});

router.get('/', function (req, res, next) {
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