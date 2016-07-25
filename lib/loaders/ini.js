const iniParser = require('ini-parser')
const fs = require('fs');

module.exports = {
  extname: '.init',
  load: function (configPath) {
    return iniParser.parse(fs.readFileSync(configPath, 'utf8'));
  }
};
