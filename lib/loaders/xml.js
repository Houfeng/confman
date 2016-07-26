const XML = require('pixl-xml');
const fs = require('fs');

module.exports = {
  extname: '.xml',
  load: function (configPath) {
    return XML.parse(fs.readFileSync(configPath, 'utf8'));
  }
};