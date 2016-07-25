const yamlParser = require('js-yaml');
const fs = require('fs');

module.exports = {
  extname: ['.yml', '.yaml'],
  load: function (configPath) {
    return yamlParser.load(fs.readFileSync(configPath, 'utf8'));
  }
};