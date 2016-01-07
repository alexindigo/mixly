var clone   = require('./clone.js')
  , chain   = require('./chain.js')
  , extend  = require('./extend.js')
  , inherit = require('./inherit.js')
  ;

// Public API

// use clone (property copying) mixin by default
module.exports = clone;
// expose everything with explicit names
module.exports.clone   = clone;
module.exports.chain   = chain;
module.exports.extend  = extend;
module.exports.inherit = inherit;
