const TOML = require('toml');
const fs = require('fs');

module.exports = {
  extname: '.toml',
  load: function (configPath) {
    return TOML.parse(fs.readFileSync(configPath, 'utf8'));
  }
};