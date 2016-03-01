var test = require('tape')
  , mixly = require('../')
  ;

/**
 * Test object zero
 */
var o0 = {
  zoo: 'boo'
};

/**
 * Test object one
 */
var o1 = Object.create(o0, {
  O1: {writable: true, enumerable: true, configurable: true, value: true},
  commonThing: {writable: true, enumerable: true, configurable: true, value: 'o1'}
});

/**
 * Test object one
 */
var o2 = Object.create(null, {
  O2: {writable: true, enumerable: true, configurable: true, value: true},
  commonThing: {writable: true, enumerable: true, configurable: true, value: 'o2'}
});

/**
 * Test object one
 */
var o3 = Object.create({}, {
  O3: {writable: true, enumerable: true, configurable: true, value: true},
  commonThing: {writable: true, enumerable: true, configurable: true, value: 'o3'}
});


test('immutable', function(t)
{
  // o1 + o2 + o3
  var oX = mixly.immutable(o1, o2, o3);

  t.notEqual(oX, o1, 'should return new object, leaving first argument unmodified');

  t.equal(Object.getPrototypeOf(oX), Object.prototype, 'returned object should have default prototype');
  t.equal(Object.getPrototypeOf(o1), o0, 'first argument should keep original prototype');
  t.equal(Object.getPrototypeOf(o2), null, 'second argument should keep original prototype');
  t.equal(Object.getPrototypeOf(Object.getPrototypeOf(o3)), Object.prototype, 'third argument should keep original prototype');

  t.true(oX.O1, 'should have property of the first object');
  t.true(oX.O2, 'should have property of the second object');
  t.true(oX.O3, 'should have property of the third object');
  t.equal(oX.commonThing, 'o3', 'should have shared property of the last object in the chain');

  t.true(oX.hasOwnProperty('commonThing'), 'returned object should have appended `commonThing` property as own');
  t.true(oX.hasOwnProperty('O1'), 'returned object should have appended property `O1` as own');
  t.true(oX.hasOwnProperty('O2'), 'returned object should have appended property `O2` as own');
  t.true(oX.hasOwnProperty('O3'), 'returned object should have appended property `O3` as own');

  t.true(o1.hasOwnProperty('commonThing'), 'first argument should keep property `commonThing` as own');
  t.true(o1.hasOwnProperty('O1'), 'first argument should keep property `O1` as own');
  t.false(o1.hasOwnProperty('O2'), 'first argument should not have appended property `O2` as own');
  t.false(o1.hasOwnProperty('O3'), 'first argument should not have appended property `O3` as own');

  // o2 wasn't modified
  t.false(o2.O1, 'should not have property from the preceding object in the chain');
  t.true(o2.O2, 'should keep it\'s own property');
  t.false(o2.O3, 'should not have property from the succeeding object in the chain');
  t.equal(o2.commonThing, 'o2', 'should keep it\'s own shared property');

  t.true(Object.prototype.hasOwnProperty.call(o2, 'commonThing'), 'should have `commonThing` as own property');
  t.false(Object.prototype.hasOwnProperty.call(o2, 'O1'), 'should not have `O1` as own property');
  t.true(Object.prototype.hasOwnProperty.call(o2, 'O2'), 'should have `O2` as own property');
  t.false(Object.prototype.hasOwnProperty.call(o2, 'O3'), 'should not have `O3` as own property');

  t.end();
});
