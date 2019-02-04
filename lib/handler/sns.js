const isJson = require('../utilities/isJson');

/**
 *
 * @param fn
 * @returns {function(*=, *=, *=): *}
 */
module.exports = fn => (event, context, callback) => {
  const packet = event.Records[0].Sns.Message;
  if (isJson(packet)) {
    event.packet = JSON.parse(packet);
  } else {
    event.packet = packet;
  }
  return fn(event, context, callback);
};
