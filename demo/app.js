const confman = require('../');

confman.loaders.push({
  extname: '.custom1',
  loader: '.yaml'
});
confman.loaders.push({
  extname: '.custom2',
  loader: require('../lib/loaders/yaml')
});

const configs = confman.load(`${__dirname}/../test/configs`);
console.log(JSON.stringify(configs));