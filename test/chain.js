var test = require('tape')
  , mixly = require('../')
  ;

/**
 * Test object one
 */
var o1 = {
  O1: true,
  commonThing: 'o1'
};

/**
 * Test object one
 */
var o2 = {
  O2: true,
  commonThing: 'o2'
};

/**
 * Test object one
 */
var o3 = {
  O3: true,
  commonThing: 'o3'
};


test('chain', function(t)
{
  t.plan(26);

  mixly.chain(o1, o2, o3);

  t.equal(Object.getPrototypeOf(o1), o2);
  t.equal(Object.getPrototypeOf(o2), o3);

  // o1
  t.true(o1.O1);
  t.true(o1.O2);
  t.true(o1.O3);
  t.equal(o1.commonThing, 'o1');

  t.true(o1.hasOwnProperty('commonThing'));
  t.true(o1.hasOwnProperty('O1'));
  t.false(o1.hasOwnProperty('O2'));
  t.false(o1.hasOwnProperty('O3'));

  // o1 -> o2
  t.false(Object.getPrototypeOf(o1).O1);
  t.true(Object.getPrototypeOf(o1).O2);
  t.true(Object.getPrototypeOf(o1).O3);
  t.equal(Object.getPrototypeOf(o1).commonThing, 'o2');

  t.true(Object.getPrototypeOf(o1).hasOwnProperty('commonThing'));
  t.false(Object.getPrototypeOf(o1).hasOwnProperty('O1'));
  t.true(Object.getPrototypeOf(o1).hasOwnProperty('O2'));
  t.false(Object.getPrototypeOf(o1).hasOwnProperty('O3'));

  // o1 -> o2 -> o3
  t.false(Object.getPrototypeOf(Object.getPrototypeOf(o1)).O1);
  t.false(Object.getPrototypeOf(Object.getPrototypeOf(o1)).O2);
  t.true(Object.getPrototypeOf(Object.getPrototypeOf(o1)).O3);
  t.equal(Object.getPrototypeOf(Object.getPrototypeOf(o1)).commonThing, 'o3');

  t.true(Object.getPrototypeOf(Object.getPrototypeOf(o1)).hasOwnProperty('commonThing'));
  t.false(Object.getPrototypeOf(Object.getPrototypeOf(o1)).hasOwnProperty('O1'));
  t.false(Object.getPrototypeOf(Object.getPrototypeOf(o1)).hasOwnProperty('O2'));
  t.true(Object.getPrototypeOf(Object.getPrototypeOf(o1)).hasOwnProperty('O3'));
});
