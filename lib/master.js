/**
 * Master for Stressor
 */

'use strict';

var sio = require('socket.io');
var forwarded = require('forwarded-for');

process.title = 'stressor-master';

var port = process.env.STRESSOR_MASTER_PORT || 3331;
var throttle = process.env.IP_THROTTLE || 100;
var redisURI = process.env.REDIS_URI || 'localhost:6379';
var uid = process.env.STRESSOR_MASTER_UID || port;

var io = module.exports = sio(port);
io.adapter(require('socket.io-redis')(redisURI));
var redis = require('./redis')();

console.log('listening on *:' + port);

io.total = 0;
io.on('connection', function(socket) {
	var req = socket.request;
  var ip = forwarded(req, req.headers);

  // === DEBUG ===
  console.log('client ip %s', ip);
});
