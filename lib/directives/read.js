const path = require('path');
const fs = require('fs');

/**
 * 引用其它配置文件的指令
 * 用法 $require path
 **/
module.exports = {
  name: 'read',
  exec: function (context) {
    var filePath = path.resolve(context.fromPath, context.value);
    return fs.readFileSync(filePath, 'utf8');
  }
};