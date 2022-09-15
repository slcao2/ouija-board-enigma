const assert = require('assert');
const {convertUndefinedToNull} = require('./sanitizers');

describe('sanitizers', () => {
  describe('convertUndefinedToNull', () => {
    it('should convert an undefined value to null', () => {
      assert.equal(convertUndefinedToNull(undefined), null);
    });

    it('should return value if value is not undefined', () => {
      assert.equal(convertUndefinedToNull(null), null);
      assert.equal(convertUndefinedToNull('12345'), '12345');
      assert.equal(convertUndefinedToNull(123), 123);
      assert.equal(convertUndefinedToNull(true), true);
    });
  });
});
