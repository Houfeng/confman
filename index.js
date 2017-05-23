const Parser = require('./lib/parser');
const webpackPlugin = require('./lib/webpack-plugin');

/**
 * 添加默认 loaders
 **/
Parser.loaders = [
  require('./lib/loaders/yaml'),
  require('./lib/loaders/cson'),
  require('./lib/loaders/json'),
  require('./lib/loaders/properties'),
  require('./lib/loaders/plist'),
  require('./lib/loaders/ini'),
  require('./lib/loaders/toml'),
  require('./lib/loaders/xml'),
  require('./lib/loaders/js'),
];

/**
 * 添加默认 directives
 **/
Parser.directives = [
  require('./lib/directives/require'),
  require('./lib/directives/calc'),
  require('./lib/directives/read'),
];

/**
 * 创建默认实例
 **/
const parser = new Parser();

/**
 * 在默认实例上挂载 Parser
 **/
parser.Parser = Parser;

/**
 * 在默认实例上挂载 loaders
 **/
parser.loaders = Parser.loaders;

/**
 * 在默认实例上挂载 directives
 **/
parser.directives = Parser.directives;

/**
 * 在默认实例上挂载 webpackPlugin
 **/
parser.webpackPlugin = webpackPlugin(parser);

module.exports = parser;