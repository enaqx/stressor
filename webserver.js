/**
 * Stressor Web-server
 */

var fs = require('fs');
var path = require('path');
var os = require('os');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Stressor web-server: ' + os.hostname() + app.get('port'));
});