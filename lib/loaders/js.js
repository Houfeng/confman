const moduleCache = require('module')._cache;

module.exports = {
  extname: '.js',
  load: function (configPath) {
    var configs = require(configPath);
    delete moduleCache[configPath];
    return configs;
  }
};