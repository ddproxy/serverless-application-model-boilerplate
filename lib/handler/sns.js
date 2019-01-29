/**
 *
 * @param fn
 * @returns {function(*=, *=, *=): *}
 */
module.exports = fn => (event, context, callback) => {
  event.packet = event.Records[0].Sns.Message;
  return fn(event, context, callback);
};
