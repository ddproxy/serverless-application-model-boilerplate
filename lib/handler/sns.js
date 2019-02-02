/**
 *
 * @param item
 * @returns {boolean}
 */
function isJson(item) {
  item = typeof item !== "string"
    ? JSON.stringify(item)
    : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}

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
