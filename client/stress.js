/**
 * Stressor Client
 */

var stressorPort = 10002;
var intervalForSending = 1000;
var io = require('socket.io').listen(stressorPort);

var data = {};

setInterval(function () {
  io.emit('data', data);
  data.value = Math.random() * 100;
}, intervalForSending);
