'use strict';
var AV = require('leanengine');

AV.init({
    appId: process.env.LEANCLOUD_APP_ID || 'UEkhb0Sgdhe2uUD52vBKw6Ty-gzGzoHsz', // 你的 app id
    appKey: process.env.LEANCLOUD_APP_KEY || 'kJTbQqgYSrH85J2pSiiE9rLx', // 你的 app key
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'cUtKlrwGp1JTavY2wa5JTz79' // 你的 master key
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var app = require('./app');

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);
app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error("Caught   :", err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
  });
});
