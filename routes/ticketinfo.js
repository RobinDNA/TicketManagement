'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象


router.get('/', function (req, res, next) {
    res.render('ticketinfo', null);
});

router.post('/', function (req, res, next) {
    console.log('current page:ticketinfo.ejs');
    console.log('req:' + req.body);
    console.log('req.body.inputTicketTitle:' + req.body.inputTicketTitle);
    console.log('req.body.inputTicketContent:' + req.body.inputTicketContent);
    console.log('req.body.inputStartDate:' + req.body.inputStartDate);
    console.log('req.body.inputEndDate:' + req.body.inputEndDate);
    console.log('req.body.inputTicketDuration:' + req.body.inputTicketDuration);
    console.log('req.body.inputScope:' + req.body.inputScope);
    console.log('req.body.inputNumberOfTimes:' + req.body.inputNumberOfTimes);
    //ticketPhoto file type
    console.log('req.body.inputTicketStatus:' + req.body.inputTicketStatus);
    

    var ticketTitle = req.body.inputTicketTitle;
    var ticketContent = req.body.inputTicketContent;
    var startDate = req.body.inputStartDate;
    var endDate = req.body.inputEndDate;
    var ticketDuration = req.body.inputTicketDuration;
    var ticketScope = req.body.inputScope;
    var numberOfTimes = req.body.inputNumberOfTimes;
    //ticketPhoto file
    var ticketStatus = req.body.inputTicketStatus;

    var btnCreate = req.body.btnCreate;
    res.render('ticketinfo', null);
    
});

module.exports = router;