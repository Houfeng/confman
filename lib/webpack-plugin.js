const VModulePlugin = require('vmodule-webpack-plugin');

module.exports = function (parser) {
  return function (options) {
    parser.env = options.env || parser.env;
    return new VModulePlugin({
      name: options.name,
      handler: function () {
        return parser.load(options.path);
      }
    });
  };
};