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

test('mixin', function(t)
{
  t.plan(19);

  var o0 = mixly(o1, o2, o3);

  t.notEqual(Object.getPrototypeOf(o0), o1, 'keeps `o1` out of the "loop"');
  t.notEqual(Object.getPrototypeOf(o1), o2, 'keeps original objects (o1, o2) untouched');
  t.notEqual(Object.getPrototypeOf(o2), o3, 'keeps original objects (o2, o3) untouched');

  t.true(o0.O1, 'copies properties from `o1` into prototype chain of `o0`');
  t.true(o0.O2, 'copies properties from `o2` into prototype chain of `o0`');
  t.true(o0.O3, 'copies properties from `o3` into prototype chain of `o0`');
  t.equal(o0.commonThing, 'o1', 'properties from left-most object "win"');

  // o0 == o1
  t.true(o0.hasOwnProperty('commonThing'), 'makes result object a shallow copy of the `o1` object');
  t.true(o0.hasOwnProperty('O1'), 'makes result object a shallow copy of the `o1` object');
  t.false(o0.hasOwnProperty('O2'), 'keeps copied properties from `o2` out of result object');
  t.false(o0.hasOwnProperty('O3'), 'keeps all the copied properties from `o3` out of result object');

  // o0 -> o2
  var o0o2 = Object.getPrototypeOf(o0);
  t.false(o0o2.hasOwnProperty('O1'), 'keeps o1 properties on the respective place in the prototype chain');
  t.true(o0o2.hasOwnProperty('O2'), 'keeps o2 properties on the respective place in the prototype chain');
  t.false(o0o2.hasOwnProperty('O3'), 'keeps o3 properties on the respective place in the prototype chain');
  t.equal(o0o2.commonThing, 'o2', 'shared properties accessible via prototype chain');

  // o0 -> o2 -> o3
  var o0o2o3 = Object.getPrototypeOf(Object.getPrototypeOf(o0));
  t.false(o0o2o3.hasOwnProperty('O1'), 'keeps o1 properties on the respective place in the prototype chain');
  t.false(o0o2o3.hasOwnProperty('O2'), 'keeps o2 properties on the respective place in the prototype chain');
  t.true(o0o2o3.hasOwnProperty('O3'), 'keeps o3 properties on the respective place in the prototype chain');
  t.equal(o0o2o3.commonThing, 'o3', 'shared properties accessible via prototype chain');
});
