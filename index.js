const snsHandler = require('./lib/handler/sns');

const snsDispatch = require('./lib/dispatch/sns');
const sesDispatch = require('./lib/dispatch/ses');

module.exports = {
  snsHandler,

  snsDispatch,
  sesDispatch
};