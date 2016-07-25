var Parser = require('./lib/parser');

Parser.loaders = [
  require('./lib/loaders/yaml'),
  require('./lib/loaders/cson'),
  require('./lib/loaders/json'),
  require('./lib/loaders/ini'),
  require('./lib/loaders/toml'),
  require('./lib/loaders/js'),
];

var parser = new Parser();
parser.Parser = Parser;

module.exports = parser;