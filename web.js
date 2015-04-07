#! /usr/bin/env node

/**
 * Stress Web Server
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redisSubscriber = require('./lib/redis')();
var redisGetter = require('./lib/redis')();

// === Settings =======
var PORT = process.env.STRESSOR_PORT || 3330; // web-interface port
// ====================

// === Web server for data presentation ===
app.use(function(req, res, next){
  req.socket.on('error', function(err){
    console.error(err.stack);
  });
  next();
});

app.get('/', function(req, res, next){
  res.sendFile(__dirname
    + '/public/');
});
app.get('/react', function(req, res){
  res.sendFile(__dirname
    + '/public/components/react/react.js');
});
app.get('/underscore', function(req, res){
  res.sendFile(__dirname
    + '/public/components/underscore/underscore.js');
});
app.get('/zepto', function(req, res){
  res.sendFile(__dirname
    + '/public/components/zepto/zepto.js');
});
app.get('/chartjs', function(req, res){
  res.sendFile(__dirname
    + '/public/components/Chart.js/Chart.js');
});
app.get('/react-chartjs', function(req, res){
  res.sendFile(__dirname
    + '/public/react-chartjs/react-chartjs.js');
});
app.get('/socketio', function(req, res){
  res.sendFile(__dirname
    + '/public/components/socket.io-client/socket.io.js');
});

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

redisSubscriber.subscribe('statistics:collected');
redisSubscriber.on('message', function (channel, message) {
  console.log("client channel " + channel + ": " + message);
  redisGetter.get('statistics:collected-last', function(err, last) {
    console.log(last.toString());
    io.emit('statistics collected', JSON.parse(last.toString()));
  });

  if(message == -1) {
    console.log('Finished collection');
    io.emit('finished collection');
  };
});