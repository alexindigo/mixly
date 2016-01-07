var test = require('tape')
  , mixly = require('../')
  ;

/**
 * Test function one
 */
function F1()
{
  this.super_.apply(this, arguments);
  this.f1 = true;
}
F1.prototype.f1p = true;

/**
 * Test function two
 */
function F2()
{
  this.f2 = true;
}
F2.prototype.f2p = true;

/**
 * Test function three
 */
function F3()
{
  this.f3 = true;
}
F3.prototype.f3p = true;


test('clone', function(t)
{
  var child;
  var F0 = mixly.clone(F1, F2, F3);

  child = new F0();

  t.equal(child.constructor, F0);
  t.equal(Object.getPrototypeOf(child), F0.prototype);
  t.true(child instanceof F0);

  t.true(child.f1);
  t.true(child.f2);
  t.false(child.f3);

  t.true(child.f1p);
  t.true(child.f2p);
  t.true(child.f3p);

  F0.bla = 'test';
  t.notEqual(F1.bla, 'test');

  F3.prototype.xyz = true;
  t.false(F2.prototype.xyz);
  t.false(F1.prototype.xyz);
  t.false(F0.prototype.xyz);
  t.false(child.xyz);

  F2.prototype.rst = true;
  t.false(F3.prototype.rst);
  t.false(F1.prototype.rst);
  t.false(F0.prototype.rst);
  t.false(child.rst);

  F1.prototype.klm = true;
  t.false(F3.prototype.klm);
  t.false(F2.prototype.klm);
  t.false(F0.prototype.klm);
  t.false(child.klm);

  F0.prototype.abc = true;
  t.false(F3.prototype.abc);
  t.false(F2.prototype.abc);
  t.false(F1.prototype.abc);
  t.true(child.abc);

  t.end();
});
