const VirtualModulePlugin = require('virtual-module-webpack-plugin');

module.exports = function (parser) {
  return function (options) {
    parser.env = options.env || parser.env;
    var configs = parser.load(options.path);
    return new VirtualModulePlugin({
      moduleName: options.name + '.json',
      contents: JSON.stringify(configs)
    });
  };
};