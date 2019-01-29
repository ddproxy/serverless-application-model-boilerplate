const AWS = require('../awsConfiguration');

/**
 *
 * @param message
 * @param topic
 * @returns {Promise<PromiseResult<SNS.PublishResponse, AWSError>>}
 */
module.exports = (topic, message) => {
  const params = {
    Message: message,
    TopicArn: topic
  };

  return new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
};
