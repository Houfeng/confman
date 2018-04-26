const VModulePlugin = require('vmodule-webpack-plugin');

module.exports = function (parser) {
  return function (opts) {
    parser.env = opts.env || parser.env;
    return new VModulePlugin({
      name: opts.name,
      content: opts.content ? opts.content : function () {
        return parser.load(opts.path);
      },
      watch: [opts.path, `${opts.path}.*`, `${opts.path}/**/*.*`]
    });
  };
};