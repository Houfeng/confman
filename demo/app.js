const parser = require('../');

const configs = parser.load(`${__dirname}/configs`);
console.log(configs);