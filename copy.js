// Public API
module.exports = mixCopy;

/**
 * Copies (shallow) own properties between provided objects
 *
 * @private
 * @param   {function} to - source object to copy properties to
 * @param   {function} from - source object to copy properties from
 * @returns {function} – augmented function
 */
function mixCopy(to, from)
{
  var keys = Object.keys(from)
    , i    = keys.length
    ;

  while (i-- > 0)
  {
    to[keys[i]] = from[keys[i]];
  }

  return to;
}
