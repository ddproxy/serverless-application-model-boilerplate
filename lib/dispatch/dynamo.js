const AWS = require('../awsConfiguration');

/**
 *
 * @param bucket
 * @param key
 * @param body
 * @returns {Promise<ManagedUpload.SendData>}
 */
module.exports = (packet) => {
  const dynamoDB = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
  return dynamoDB.putItem(packet).promise();
}
;
