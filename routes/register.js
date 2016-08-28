'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var multer = require('multer');

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
    console.log('req.body.inputCellphoneNumber:' + req.body.inputCellphoneNumber);
    console.log('req.body.inputVerificationCode:' + req.body.inputVerificationCode);
    console.log('req.body.inputPassword:' + req.body.inputPassword);
    console.log('req.body.inputPasswordAgain:' + req.body.inputPasswordAgain);
    console.log('req.body.inputEmail:' + req.body.inputEmail);
    console.log('req.body.sltIndustry:' + req.body.sltIndustry);

    console.log('req.body.switchState:' + req.body.switchState);

    console.log('req.body.inputCompanyName:' + req.body.inputCompanyName);
    console.log('req.body.inputChineseName:' + req.body.inputChineseName);
    console.log('req.body.inputProjectDesc:' + req.body.inputProjectDesc);

    console.log('req.files.fileBusinessLicences:' + req.files.fileBusinessLicences);
    console.log('req.files.filePersonId:' + req.files.filePersonId);

    console.log('promotionId:' + promotionId);

    var cellphoneNum = req.body.inputCellphoneNumber;
    var verificationCode = req.body.inputVerificationCode;
    var userPassword = req.body.inputPassword;
    var userPasswordAgain = req.body.inputPasswordAgain;
    var email = req.body.inputEmail;
    var industry = req.body.sltIndustry;

    var switchState = req.body.switchState;

    var companyName = req.body.inputCompanyName;
    var chineseName = req.body.inputChineseName;    
    var projectDesc = req.body.inputProjectDesc;

    var fileBusinessLicences = req.files.fileBusinessLicences;
    var filePersonId = req.files.filePersonId;


    var vote = req.query.vote;
    console.log("vote:" + vote);

    if (vote == 'sendSmsCode') {
        //

        //发送短信
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber: cellphoneNum,
            name: '众孵券码管理系统',
            op: '注册',
            ttl: 10
        }).then(function () {
            //发送成功
            console.log('向手机' + cellphoneNum + '发送验证码短信成功。');
            res.json({ isSendSuccess: true, errMsg: '发送验证码短信成功。' });
        }, function (err) {
            //发送失败
            var errMsg = err.code + ':' + err.message;
            errMsg = '向手机' + cellphoneNum + '发送验证码短信失败。(' + errMsg + ")";
            console.log(errMsg);
            res.json({ isSendSuccess: 'false', errMsg: errMsg });
        });
    }

    if (vote == 'register') {
        var isRegisterSuccess = true;
        console.log('进入注册');
        if (cellphoneNum != null && cellphoneNum != '' && verificationCode != null && verificationCode != '') {
            console.log('手机号/验证码不为空。');
            AV.Cloud.verifySmsCode(verificationCode, cellphoneNum).then(function () {
                //验证码正确
                console.log('验证码校验正确。');
                //注册逻辑
                //1 个人用户

                var user = new AV.User();
                user.set("username", cellphoneNum);
                user.set("password", userPassword);
                user.set("email", email);
                user.set("Industry", industry);
                
                if (switchState=='on') {
                    //1:个人；2:企业；3:管理员
                    user.set("MemberType", '1');
                    user.set("ChineseName", chineseName);
                    user.set("PersonIdImg", filePersonId);
                }
                else
                {
                    //1:个人；2:企业；3:管理员
                    user.set("MemberType", '2');
                    //2 企业用户
                    user.set("CompanyName", companyName);
                    user.set("BusinessLicencesImg", fileBusinessLicences);
                }

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
                    var locationUrl = '/login';
                    res.json({ isRegisterSuccess: true, locationUrl: locationUrl });
                }, function (err) {                    
                    var errMsg = '注册失败(' + err.code + ' : ' + err.message + ")";
                    console.log(errMsg);
                    res.json({ isRegisterSuccess: false, errMsg: errMsg });                    
                }).catch(next);               
            }
        , function (error) {
                // 验证码错误，验证失败            
            var errorMsg = '验证码错误(' + error.code + ' : ' + error.message +")";
                console.log(errorMsg);
                res.json({ isRegisterSuccess: false, errMsg: errorMsg });
            }).catch(next);
        }
        else {
            console.log('手机号/验证码不能为空')
            var errorMsg = '手机号/验证码不能为空。';
            res.json({ isRegisterSuccess: false, errMsg: errorMsg });
        }
    }

});

module.exports = router;