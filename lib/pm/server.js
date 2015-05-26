var _ = require('underscore');
var io = require('socket.io').listen(10002);

var buff = {};
var lastSecond = null;

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    _.each(data.TextMetric, function(d) {
      var seconds = Math.round(d.time / 1000);
      if ((buff['s' + seconds] === undefined)
          && (seconds > lastSecond)) {
        console.log('add:', seconds, 'last:', lastSecond);
        buff['s' + seconds] = [];
      }
      if (buff['s' + seconds] !== undefined) {
        buff['s' + seconds].push(d.value);
      }
    });
    console.log('===');
  });
});

var sendClient = function() {
  var secondToSend =
    _.max(_.map(Object.keys(buff), function(key) {
      return key.slice(1, key.length)
    }));
  var totalToSend = {};
  totalToSend.data = 0;
  _.each(buff['s' + secondToSend], function(elem) {
    if(!_.isUndefined(elem)) {
      if(!_.isUndefined(elem.data)) totalToSend.data += elem.data;
      if(!_.isUndefined(elem.mem))
        totalToSend.mem = +(elem.mem / 1024 / 1024).toFixed(2);
      if(!_.isUndefined(elem.cpu)) totalToSend.cpu = elem.cpu;
    }
  });
  if (secondToSend !== -Infinity) {
    console.log('send and delete for', secondToSend);
  }
  console.log(totalToSend);
  io.emit('data', {value: totalToSend});
  lastSecond = secondToSend;
  delete buff['s' + secondToSend];
}

setInterval(sendClient, 1000);
