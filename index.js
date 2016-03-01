var copy      = require('./copy.js')
  , chain     = require('./chain.js')
  , clone     = require('./clone.js')
  , extend    = require('./extend.js')
  , append    = require('./append.js')
  , inherit   = require('./inherit.js')
  , immutable = require('./immutable.js')
  ;

// Public API

// use clone (property copying) mixin by default
module.exports = clone;
// expose everything with explicit names
module.exports.copy      = copy;
module.exports.chain     = chain;
module.exports.clone     = clone;
module.exports.extend    = extend;
module.exports.append    = append;
module.exports.inherit   = inherit;
module.exports.immutable = immutable;
