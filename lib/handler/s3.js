/**
 *
 * @param fn
 * @returns {function(*=, *=, *=): *}
 */
module.exports = fn => (event, context, callback) => {
  event.packet = event.Records[0].s3;
  return fn(event, context, callback);
};
