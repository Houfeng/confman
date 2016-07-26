var Parser = require('./lib/parser');

/**
 * 添加默认 loaders
 **/
Parser.loaders = [
  require('./lib/loaders/yaml'),
  require('./lib/loaders/cson'),
  require('./lib/loaders/json'),
  require('./lib/loaders/ini'),
  require('./lib/loaders/toml'),
  require('./lib/loaders/js'),
];

/**
 * 创建默认实例
 **/
var parser = new Parser();

/**
 * 在默认实例上挂载 Parser
 **/
parser.Parser = Parser;

/**
 * 在默认实例上挂载 loaders
 **/
parser.loaders = Parser.loaders;

module.exports = parser;