const moduleCache = require('module')._cache;

module.exports = {
  extname: '.js',
  load: function (configPath) {
    var config = require(configPath);
    delete moduleCache[configPath];
    return config;
  }
};