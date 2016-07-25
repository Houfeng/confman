const fs = require('fs');

module.exports = {
  extname: '.json',
  load: function (configPath) {
    var buffer = fs.readFileSync(configPath, 'utf8');
    return buffer ? JSON.parse(buffer.toString()) : null;
  }
};