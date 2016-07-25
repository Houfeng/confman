const CSON = require('cson-parser');
const fs = require('fs');

module.exports = {
  extname: '.cson',
  load: function (configPath) {
    return CSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
};