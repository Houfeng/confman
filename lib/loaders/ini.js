const iniParser = require('ini-parser')
const fs = require('fs');

module.exports = {
  extname: '.ini',
  load: function (configPath) {
    return iniParser.parse(fs.readFileSync(configPath, 'utf8'));
  }
};
