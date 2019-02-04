const { s3Handler, dynamoDispatch } = require('../../index');

exports.handler = s3Handler((event, context, callback) => {
  console.log(event.packet);

  dynamoDispatch({
    Item: {
      "id": {
        S: event.packet.object.key
      }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: process.env.DYNAMO_TABLE
  })
    .then(() => callback(null, `Successfully received S3 event`))
    .catch(e => {
      console.error(e, e.stack);
      callback(e);
    });
});
