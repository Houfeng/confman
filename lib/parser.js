const fs = require('fs');
const path = require('path');
const Class = require('cify').Class;
const utils = require('real-utils');

const DIR_DEFAULT_FILE = 'index';

/**
 * 定义配置 Parser
 **/
const Parser = new Class({

  /**
   * 构造一个配置解析器
   **/
  constructor: function (options) {
    options = options || Object.create(null);
    this.cache = Object.create(null);
    this.env = options.env || process.env.NODE_ENV;
  },

  /**
   * 判断路径是否存在
   **/
  _exists: function (_path) {
    try {
      return fs.statSync(_path);
    } catch (err) {
      return false;
    }
  },

  /**
   * 获取所有支持的扩展名
   **/
  _getExtnames: function () {
    var extnames = [];
    this._static.loaders.forEach(function (item) {
      extnames = extnames.concat(item.extname);
    });
    return extnames;
  },

  /**
   * 获取一个 loaders
   **/
  _getLoader: function (extname) {
    return utils.each(this._static.loaders, function (i, loader) {
      var extnames = utils.isArray(loader.extname) ?
        loader.extname :
        [loader.extname];
      if (extnames.indexOf(extname) < 0) return;
      if (utils.isString(loader.loader)) {
        return this._getLoader(loader.loader);
      } else if (loader.loader) {
        return loader.loader;
      } else {
        return loader;
      }
    }.bind(this));
  },

  /**
   * 计算环境配置路径
   **/
  _getEnvPath: function (_path) {
    var parsed = path.parse(_path);
    return path.normalize(parsed.dir + '/' + parsed.name + '.' + this.env);
  },

  /**
   * 加载配置(公开方法)
   **/
  load: function (configPaths) {
    if (!utils.isArray(configPaths)) {
      configPaths = [configPaths];
    }
    //计算环境配置路径，将来可以将计算分别放在 _loadFile 和 _loadDir
    //使用「目录」时，便可以支持多级「环境配置」
    var convertedPaths = [];
    configPaths.forEach(function (configPath) {
      convertedPaths.push(configPath);
      convertedPaths.push(this._getEnvPath(configPath));
    }.bind(this));
    return this._loadArray(convertedPaths);
  },

  /**
   * 加载一组配置，返回合并后的结果
   **/
  _loadArray: function (configPaths) {
    var mergedConfigs = {};
    configPaths.filter(function (configPath) {
      return !!configPath;
    }).forEach(function (configPath) {
      if (!path.isAbsolute(configPath)) {
        throw new Error('Invalid path: "' + configPath + '" is not an absolute path');
      }
      var configs = this._load(configPath);
      utils.mix(mergedConfigs, configs, true, null, 2, true);
    }.bind(this));
    return mergedConfigs;
  },

  /**
   * 加载配置(内部方法)
   **/
  _load: function (configPath, extname, triedExtnames) {
    var configs = Object.create(null);
    var fullConfigPath = configPath + (extname || '');
    var exists = this._exists(fullConfigPath);
    if (!exists) {
      triedExtnames = triedExtnames || [];
      var tryExtname = this._getExtnames().filter(function (_extname) {
        return triedExtnames.indexOf(_extname) < 0;
      })[0];
      if (!tryExtname) return Object.create(null);
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

  /**
   * 加载一个文件
   **/
  _loadFile: function (configPath) {
    if (this.cache[configPath]) {
      return this.cache[configPath];
    }
    if (!this._exists(configPath)) return Object.create(null);
    var fromPath = path.dirname(configPath);
    var extname = path.extname(configPath);
    var loader = this._getLoader(extname);
    var configs = loader ?
      (loader.load(configPath) || Object.create(null)) :
      Object.create(null);
    this.cache[configPath] = configs;
    utils.each(configs, function (name, value) {
      if (/^\$require .+/igm.test(value)) {
        var importPath = path.resolve(fromPath, value.substr(9));
        configs[name] = this._load(importPath);
      }
    }.bind(this));
    return configs;
  },

  /**
   * 加载一个目录
   **/
  _loadDir: function (configPath) {
    if (this.cache[configPath]) {
      return this.cache[configPath];
    }
    if (!this._exists(configPath)) return Object.create(null);
    var fromPath = configPath;
    var configs = this._load(path.resolve(fromPath, DIR_DEFAULT_FILE));
    this.cache[configPath] = configs;
    var entities = fs.readdirSync(configPath);
    entities.forEach(function (entityName) {
      var name = path.parse(entityName).name;
      if (name == DIR_DEFAULT_FILE) return;
      var childPath = path.resolve(fromPath, entityName);
      configs[name] = this._load(childPath);
    }.bind(this));
    return configs;
  }

});

/**
 * 所有 loader 
 **/
Parser.loaders = [];

module.exports = Parser;