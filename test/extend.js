var test = require('tape')
  , mixly = require('../')
  ;

/**
 * Test function one
 */
function F1()
{
  F1.super_.apply(this, arguments);
  this.f1 = true;
}
F1.prototype.f1p = true;
F1.static1 = true;
F1.static0 = 'f1';

/**
 * Test function two
 */
function F2()
{
  this.f2 = true;
}
F2.prototype.f2p = true;
F2.static2 = true;
F2.static0 = 'f2';

test('extend', function(t)
{
  var child;
  mixly.extend(F1, F2);

  F1.prototype.f1p2 = true;

  child = new F1();

  t.equal(child.constructor, F1);
  t.equal(Object.getPrototypeOf(child), F1.prototype);
  t.true(child instanceof F1);

  t.true(child.f1);
  t.true(child.f2);

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

  t.end();
});
