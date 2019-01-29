const AWS = require('../awsConfiguration');
const striptags = require('striptags');

/**
 *
 * @param to
 * @param from
 * @param subject
 * @param message
 * @param options
 * @returns {Promise<PromiseResult<SES.SendEmailResponse, AWSError>>}
 */
module.exports = (to, from, subject = '', message, options = {}) => {
  if (!message || message.length === 0) {
    throw Error("SES Message empty");
  }
  const params = {
    Destination: {
      ToAddresses: (Array.isArray(to)) ? to : [to]
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: message
        },
        Text: {
          Charset: "UTF-8",
          Data: striptags(message)
        }
      }
    },
    Source: from
  };

  if (options.cc) {
    params.Destination.CcAddresses = (Array.isArray(options.cc)) ? options.cc : [options.cc];
  }

  if (options.reply) {
    params.ReplyToAddresses = (Array.isArray(options.reply)) ? options.reply : [options.reply];
  } else {
    params.ReplyToAddresses = from;
  }

  return new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
};
