const { scheduleHandler, snsDispatch } = require('../../index');

exports.handler = scheduleHandler((event, context, callback) => {
  const dispatch = snsDispatch(
    process.env.TEST_SNS,
    { default: 'Test Packet', message: `Sent at ${new Date()}` }
  );

  dispatch
    .then(data => {
      console.log(`MessageID is ${data.MessageId}`);
      callback(null, `Successfully dispatched SNS Event to ${process.env.TEST_SNS} as ${data.MessageId}`);
    })
    .catch(e => {
      console.error(e, e.stack);
      callback(e);
    });
});