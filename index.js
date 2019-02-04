const alexaHandler = require('./lib/handler/alexa');
const apiHandler = require('./lib/handler/api');
const cloudwatcheventHandler = require('./lib/handler/cloudwatchevent');
const cloudwatchlogHandler = require('./lib/handler/cloudwatchlog');
const dynamoHandler = require('./lib/handler/dynamo');
const iotHandler = require('./lib/handler/iot');
const kinesisHandler = require('./lib/handler/kinesis');
const s3Handler = require('./lib/handler/s3');
const scheduleHandler = require('./lib/handler/schedule');
const snsHandler = require('./lib/handler/sns');
const sqsHandler = require('./lib/handler/sqs');

const dynamoDispatch = require('./lib/dispatch/dynamo');
const snsDispatch = require('./lib/dispatch/sns');
const s3Dispatch = require('./lib/dispatch/s3');
const sesDispatch = require('./lib/dispatch/ses');

module.exports = {
  alexaHandler,
  apiHandler,
  cloudwatcheventHandler,
  cloudwatchlogHandler,
  dynamoHandler,
  iotHandler,
  kinesisHandler,
  s3Handler,
  scheduleHandler,
  snsHandler,
  sqsHandler,

  dynamoDispatch,
  s3Dispatch,
  snsDispatch,
  sesDispatch
};