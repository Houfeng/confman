const fs = require('fs');
const path = require('path');
const Class = require('cify').Class;
const utils = require('real-utils');

const Parser = new Class({

  /**
   * 构造一个配置解析器
   **/
  constructor: function (options) {
    options = options || {};
    this.cache = {};
    this.env = options.env || process.env.NODE_ENV;
  },

  _exists: function (_path) {
    try {
      return fs.statSync(_path);
    } catch (err) {
      return false;
    }
  },

  _getExtnames: function () {
    var extnames = [];
    this._static.loaders.forEach(function (item) {
      extnames = extnames.concat(item.extname);
    });
    return extnames;
  },

  _getLoader: function (extname) {
    return utils.each(this._static.loaders, function (index, loader) {
      if (loader.extname.indexOf(extname) > -1) return loader;
    });
  },

  load: function (configPath) {
    var normalConfigs = this._load(configPath);
    var envConfigs = this._load(configPath + '.' + this.env);
    return utils.mix(normalConfigs, envConfigs, true, null, 2, true);
  },

  /**
   * 加载配置
   **/
  _load: function (configPath, extname, triedExtnames) {
    var configs = {};
    var fullConfigPath = configPath + (extname || '');
    var exists = this._exists(fullConfigPath);
    if (!exists) {
      triedExtnames = triedExtnames || [];
      var tryExtname = this._getExtnames().filter(function (_extname) {
        return triedExtnames.indexOf(_extname) < 0;
      })[0];
      if (!tryExtname) return {};
      triedExtnames.push(tryExtname);
      return this._load(configPath, tryExtname, triedExtnames);
    }
    if (exists.isDirectory(fullConfigPath)) {
      configs = this._loadDir(fullConfigPath);
    } else {
      configs = this._loadFile(fullConfigPath);
    }
    return configs;
  },

  _loadFile: function (configPath) {
    if (this.cache[configPath]) {
      return this.cache[configPath];
    }
    if (!this._exists(configPath)) return {};
    var fromPath = path.dirname(configPath);
    var extname = path.extname(configPath);
    var loader = this._getLoader(extname);
    var configs = loader ? (loader.load(configPath) || {}) : {};
    this.cache[configPath] = configs;
    utils.each(configs, function (name, value) {
      if (/^\$require .+/igm.test(value)) {
        var importPath = path.resolve(fromPath, value.substr(9));
        configs[name] = this._load(importPath);
      }
    }.bind(this));
    return configs;
  },

  _loadDir: function (configPath) {
    if (this.cache[configPath]) {
      return this.cache[configPath];
    }
    if (!this._exists(configPath)) return {};
    var fromPath = configPath;
    var configs = this._loadFile(path.resolve(fromPath, 'index'));
    this.cache[configPath] = configs;
    var entities = fs.readdirSync(configPath);
    entities.forEach(function (name) {
      var childPath = path.resolve(fromPath, name);
      configs[path.parse(name).name] = this._load(childPath);
    }.bind(this));
    return configs;
  }

});

Parser.loaders = [];

module.exports = Parser;