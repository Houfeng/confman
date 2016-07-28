const assert = require('assert');
const confman = require('../');

describe('confman', function () {

  it('load', function () {
    confman.loaders.push({
      extname: '.custom1',
      loader: '.yaml'
    });
    confman.loaders.push({
      extname: '.custom2',
      loader: require('../lib/loaders/yaml')
    });
    var configs = confman.load(`${__dirname}/configs`);
    assert.deepEqual(configs, { "name": "index", "calc": "index:ok", "file": "test14", "test1": { "name": "test1", "include": { "test6": { "name": "test6" } } }, "test12": { "name": "test12" }, "test13": "test13", "test14": {}, "test2": { "test10": { "name": "test10" }, "test11": { "name": "test11" }, "test3": { "test3": { "name": "test3" } }, "test4": { "name": "test4" }, "test6": { "test6": { "name": "test6" } }, "test7": { "name": "test7" }, "test9": { "name": "test9" } }, "test5": { "name": "test5" }, "test8": {} });
  });

});