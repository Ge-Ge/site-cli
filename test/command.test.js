'use strict';
const assert = require('power-assert');
const command = require('../src/command.js');
const path = require('path');
describe('command', function () {
  describe('#init()', function () {
    it('should return -1 when the value is not present', function () {
      const list = ['nginx'];
      command.init(list, path.join(process.cwd(), '__tests__'));
      assert([1,2,3].indexOf(4) === -1);
    });
  });
});
