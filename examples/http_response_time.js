/**
 * Response time for HTTP
 */

var http = require('http');
var host = 'google.com';
var port = 80;
var start = new Date();
http.get({host: host, port: port}, function(res) {
  console.log('Request for ' + host + ':' + port + ' took:',
  	Date.now() - start, 'ms');
});
