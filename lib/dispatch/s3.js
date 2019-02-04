const AWS = require('../awsConfiguration');

/**
 *
 * @param bucket
 * @param key
 * @param body
 * @returns {Promise<ManagedUpload.SendData>}
 */
module.exports = (bucket, key, body) => {
  const params = { Bucket: bucket, Key: key, Body: body };
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
  return s3.upload(params).promise();
}
;
