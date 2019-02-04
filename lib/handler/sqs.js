/**
 *
 * @param fn
 * @returns {function(*=, *=, *=): *}
 */
module.exports = fn => (event, context, callback) => {
  console.log(event);
  return fn(event, context, callback);
};
