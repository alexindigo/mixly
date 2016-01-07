var test = require('tape')
  , mixly = require('../')
  ;

/**
 * Test child function
 */
function Child(t)
{
  Parent.call(this);
  assert(t, this);
}

/**
 * Test parent function
 */
function Parent() {}

/**
 * Runs asserts against provided object
 *
 * duplicate `inherits` tests to be on the same page
 * with node's implementation
 *
 * @param {object} t - test suite
 * @param {object} obj – object to run asserts against
 * @returns {void}
 */
function assert(t, obj)
{
  t.equal(obj.constructor, Child);
  t.equal(obj.constructor.super_, Parent);
  t.equal(Object.getPrototypeOf(obj), Child.prototype);
  t.equal(Object.getPrototypeOf(Object.getPrototypeOf(obj)), Parent.prototype);
  t.true(obj instanceof Child);
  t.true(obj instanceof Parent);
}

test('inherit', function(t)
{
  var child;

  mixly.inherit(Child, Parent);

  child = new Child(t);

  assert(t, child);

  t.end();
});
