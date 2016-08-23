var test = require('tape')
  , mixly = require('../')
  ;

/**
 * Test function one
 */
function F1()
{
  F1.super_.apply(this, arguments);
  this.f0 = 'f1';
  this.f1 = true;
}
F1.prototype.f1p = true;
F1.prototype.f0p = 'f1';
F1.static1 = true;
F1.static0 = 'f1';

/**
 * Test function two
 */
function F2()
{
  this.f0 = 'f2';
  this.f2 = true;
}
F2.prototype.f2p = true;
F2.prototype.f0p = 'f2';
F2.static2 = true;
F2.static0 = 'f2';

test('extend', function(t)
{
  t.plan(21);

  var child;

  mixly.extend(F1, F2);

  F1.prototype.f1p2 = true;

  t.true(F1.prototype.f2p, 'should have prototype property from the source object');
  t.equal(F1.prototype.f1p, undefined, 'should not have property from the original prototype');
  t.equal(F1.prototype.f0p, 'f2', 'prototype property from the extended prototype should prevail');

  t.true(F1.static2, 'should have static property from the source object');
  t.true(F1.static1, 'should have static property from the target object');
  t.equal(F1.static0, 'f1', 'static property from the source object should prevail');

  child = new F1();

  t.equal(child.constructor, F1, 'should have proper constructor');
  t.equal(Object.getPrototypeOf(child), F1.prototype, 'should have proper prototype');
  t.true(child instanceof F1, 'should be instance of the proper constructor');

  t.equal(child.f0, 'f1', 'property from the target\'s instance should be on top');
  t.true(child.f1, 'should have property set on the target\'s instance');
  t.true(child.f2, 'should have property set on the source\'s instance');

  // it kills original prototype
  t.false(child.f1p);
  t.true(child.f2p);
  // but new one could be modified
  t.true(child.f1p2);
  t.false(F2.prototype.f1p2);

  F1.bla = 'test';
  t.notEqual(F2.bla, 'test');

  t.equal(F1.static0, 'f1');
  t.true(F1.static1);
  t.true(F1.static2);
  // and proto is available too
  t.equal(Object.getPrototypeOf(F1).static0, 'f2');
});
