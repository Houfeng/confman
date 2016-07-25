const assert = require('assert');
const configParser = require('../');

describe('config-parser', function () {

  it('load', function () {
    var configs = configParser.load(`${__dirname}/configs`);
    assert.deepEqual(configs, { "name": "index", "test1": { "name": "test1", "include": { "test6": { "name": "test6" } } }, "test2": { "test3": { "test3": { "name": "test3" } }, "test4": { "name": "test4" }, "test6": { "test6": { "name": "test6" } }, "test7": { "name": "test7" } }, "test5": { "name": "test5" } });
  });

});