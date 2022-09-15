const assert = require('assert');
const sinon = require('sinon');
const {fn: moment}= require('moment');
const {getElapsedTime} = require('./timeHelpers');

describe('timeHelpers', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getElapsedTime', () => {
    it('should get elapsed time string', () => {
      const mockTime = '2022-09-05T17:19:14Z';
      const expected = 'a few seconds ago';
      sinon.replace(moment, 'fromNow', sinon.fake.returns(expected));
      assert.equal(getElapsedTime(mockTime), expected);
    });
  });
});
