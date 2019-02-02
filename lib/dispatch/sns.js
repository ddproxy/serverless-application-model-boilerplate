const AWS = require('../awsConfiguration');

/**
 *
 * @param topic
 * @param message
 * @returns {Promise<PromiseResult<D, E>>}
 */
module.exports = (topic, message) => {
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }

  const params = {
    Message: message,
    TopicArn: topic
  };
  const sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  return sns.publish(params).promise();
};
