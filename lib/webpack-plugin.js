const VModulePlugin = require('vmodule-webpack-plugin');
const { isFunction } = require('ntils');

module.exports = function (parser) {
  return function (opts) {
    parser.env = opts.env || parser.env;
    return new VModulePlugin({
      name: opts.name,
      handler: function () {
        return isFunction(opts.path) ? opts.path() : parser.load(opts.path);
      },
      watch: [
        opts.path,
        `${opts.path}.*`,
        `${opts.path}/**/*.*`
      ]
    });
  };
};