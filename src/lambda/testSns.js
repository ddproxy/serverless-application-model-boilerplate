const { snsHandler, s3Dispatch } = require('../../index');

exports.handler = snsHandler((event, context, callback) => {
  if (!event.packet) {
    callback(`Failed to receive packet: ${event}`);
  }
  console.log(event.packet);

  console.log(event.packet.default);
  console.log(event.packet.message);
  s3Dispatch(
    process.env.BUCKET,
    `${Math.random().toString(36).substring(7)}.json`,
    Buffer.from(event.packet.message, 'utf8')
  )
    .then(() => callback(null, `Successfully received packet: ${event.packet} and submitted message to S3`))
    .catch(e => {
      console.error(e, e.stack);
      callback(e);
    });
});
