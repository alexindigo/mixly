var chain   = require('./chain.js')
  , clone   = require('./clone.js')
  , extend  = require('./extend.js')
  , inherit = require('./inherit.js')
  ;

// Public API

// use clone (property copying) mixin by default
module.exports = clone;
// expose everything with explicit names
module.exports.chain   = chain;
module.exports.clone   = clone;
module.exports.extend  = extend;
module.exports.inherit = inherit;
