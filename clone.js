var chain = require('./chain.js');

// Public API
module.exports = mixClone;

/**
 * Creates prototype chain with the properties
 * from the provided objects, by (shallow) copying
 * own properties from each object onto respective
 * element in the chain
 *
 * @private
 * @param   {...object} from - object(s) to mix in with
 * @returns {object} new object with mixed in properties
 */
function mixClone()
{
  // keep original prototype for the last argument
  var args   = Array.prototype.slice.call(arguments)
    , i      = args.length
    , output = new Function()
    , target
    ;

  while (i--)
  {
    // "clone" function
    target = copyFunction(args[i]);

    // add `output` as a prototype and __proto__
    // and promote `target` to be a prototype
    // for the next argument
    output = addSuper(target, output);
  }

  return output;
}

/**
 * Creates function that executes provided function
 *
 * @param   {function} original - function to copy
 * @returns {function} - copied function
 */
function copyFunction(original)
{
  var target = function()
  {
    return original.apply(this, arguments);
  };

  // copy it's "static" methods
  copy(target, original);
  // duplicate prototype methods
  copy(target.prototype, original.prototype);

  // add instance reference to the it's own constructor
  Object.defineProperty(target.prototype, 'constructor', {
    value       : target,
    writable    : true,
    enumerable  : false,
    configurable: true
  });

  return target;
}

/**
 * Adds reference to the superclass
 * and it's prototype as a `__proto__`.
 *
 * @param   {function} target - Function (class) to update
 * @param   {function} super_ - Superclass to be a donor
 * @returns {function} – augmented target function
 */
function addSuper(target, super_)
{
  // add reference to the super class
  Object.defineProperty(target, 'super_', {
    value       : super_,
    writable    : true,
    enumerable  : false,
    configurable: true
  });
  // add instance reference to the superclass
  Object.defineProperty(target.prototype, 'super_', {
    value       : super_,
    writable    : true,
    enumerable  : false,
    configurable: true
  });

  // add super_ function as `__proto__`
  // of the target function
  // and chain their prototypes as well
  chain(target, super_);
  chain(target.prototype, super_.prototype);

  return target;
}

/**
 * Copies (shallow) own properties between provided objects
 *
 * @private
 * @param   {function} to - source object to copy properties to
 * @param   {function} from - source object to copy properties from
 * @returns {function} – augmented function
 */
function copy(to, from)
{
  var keys = Object.keys(from)
    , i    = keys.length
    ;

  while (i--)
  {
    to[keys[i]] = from[keys[i]];
  }

  return to;
}
