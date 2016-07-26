const plist = require('plist');
const fs = require('fs');

module.exports = {
  extname: '.plist',
  load: function (configPath) {
    return plist.parse(fs.readFileSync(configPath, 'utf8'));
  }
};