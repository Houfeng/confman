const vm = require('vm');

/**
 * 计算指令，可用 root,parent,self 等几个变量
 * 用法 $calc expr
 **/
module.exports = {
  name: 'calc',
  exec: function (context) {
    return vm.runInNewContext(context.value, context);
  }
};