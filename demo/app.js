const configParser = require('../');

const configs = configParser.load(`${__dirname}/../test/configs`);
console.log(JSON.stringify(configs));