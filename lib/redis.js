/**
 * Redis Connector 
 */

'use strict';

var redis = require('redis');
var uri = process.env.REDIS_URI || 'localhost:6379';
var pieces = uri.split(':');

module.exports = function(){
  return redis.createClient(pieces[1], pieces[0], { return_buffers: true });
};
