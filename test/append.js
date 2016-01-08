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


test('append', function(t)
{
  // o1 + o2 + o3
  mixly.append(o1, o2, o3);

  t.equal(Object.getPrototypeOf(o1), o0);
  t.equal(Object.getPrototypeOf(o2), null);

  t.true(o1.O1);
  t.true(o1.O2);
  t.true(o1.O3);
  t.equal(o1.commonThing, 'o3');

  t.true(o1.hasOwnProperty('commonThing'));
  t.true(o1.hasOwnProperty('O1'));
  t.true(o1.hasOwnProperty('O2'));
  t.true(o1.hasOwnProperty('O3'));

  // o2 wasn't modified
  t.false(o2.O1);
  t.true(o2.O2);
  t.false(o2.O3);
  t.equal(o2.commonThing, 'o2');

  t.true(Object.prototype.hasOwnProperty.call(o2, 'commonThing'));
  t.false(Object.prototype.hasOwnProperty.call(o2, 'O1'));
  t.true(Object.prototype.hasOwnProperty.call(o2, 'O2'));
  t.false(Object.prototype.hasOwnProperty.call(o2, 'O3'));

  t.end();
});
