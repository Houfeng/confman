const properties = require('properties');
const fs = require('fs');

module.exports = {
  extname: '.properties',
  load: function (configPath) {
    return properties.parse(fs.readFileSync(configPath, 'utf8'));
  }
};