const path = require('path');

/**
 * 引用其它配置文件的指令
 * 用法 $require path
 **/
module.exports = {
  name: 'require',
  exec: function (context) {
    var filePath = path.resolve(context.fromPath, context.value);
    return context.parser._load(filePath);
  }
};