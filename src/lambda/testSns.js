const { snsHandler } = require('sam-stereotype');

exports.handler = snsHandler((event, context, callback) => {
  if (event.packet) {
    callback(null, `Successfully received packet: ${event.packet}`);
  }
  callback(null, `Failed to receive packet: ${event}`);
});
