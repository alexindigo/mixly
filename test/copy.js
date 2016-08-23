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
var o3 = Object.create(o0, {
  O3: {writable: true, enumerable: true, configurable: true, value: true},
  commonThing: {writable: true, enumerable: true, configurable: true, value: 'o3'}
});


test('copy', function(t)
{
  t.plan(16);

  // o1 + o2
  mixly.copy(o1, o2);

  t.equal(Object.getPrototypeOf(o1), o0);
  t.equal(Object.getPrototypeOf(o2), null);

  t.true(o1.O1);
  t.true(o1.O2);
  t.equal(o1.commonThing, 'o2');

  t.true(o1.hasOwnProperty('commonThing'));
  t.true(o1.hasOwnProperty('O1'));
  t.true(o1.hasOwnProperty('O2'));

  // o2 + o3
  mixly.copy(o2, o3);

  t.equal(Object.getPrototypeOf(o2), null);
  t.equal(Object.getPrototypeOf(o3), o0);

  t.true(o2.O2);
  t.true(o2.O3);
  t.equal(o2.commonThing, 'o3');

  t.true(Object.prototype.hasOwnProperty.call(o2, 'commonThing'));
  t.true(Object.prototype.hasOwnProperty.call(o2, 'O2'));
  t.true(Object.prototype.hasOwnProperty.call(o2, 'O3'));
});
