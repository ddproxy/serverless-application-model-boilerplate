const { snsHandler } = require('../../index');

exports.handler = snsHandler((event, context, callback) => {
  if (event.packet) {
    console.log(event.packet);

    console.log(event.packet.default);
    console.log(event.packet.message);

    callback(null, `Successfully received packet: ${event.packet}`);
  }
  callback(`Failed to receive packet: ${event}`);
});
