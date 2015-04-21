#! /usr/bin/env node

/**
 * Stress Test master
 */

'use strict';

var cluster = require('cluster');
var os = require('os');
var path = require('path');
var program = require('commander');
var worker = require('./worker');
var socket = require('socket.io-client')('http://' + process.argv[2]);

var checkPath = function (value) {
	return path.join('../examples/', value);
}


program
	.option('-w, --workers [number]', 'Workers number', os.cpus().length)
	.option('-c, --cycles [number]', 'Cycles number', 10)
	.option('-s, --scenario [file]', 'Scenario to run', checkPath,
		'../examples/http_response_time.js')
	.option('-r, --redis [uri]', 'Redis server URI', 'localhost:6379')
	.parse(process.argv);

var redisSubscriber = require('./redis')(process.argv[2]);
var redisPublisher = require('./redis')(process.argv[2]);
var redisSetter = require('./redis')(process.argv[2]);


var statisticsCollected = 0;
if (cluster.isMaster) {
	var workersNum = program.workers;
	redisSubscriber.subscribe('start:test');
	redisSubscriber.on('message', function (channel, message) {
		var params = JSON.parse(message.toString());
		if (params.command === 'start') {
			collector(params.workers, params.cycles);
		};

		Object.keys(cluster.workers).forEach(function(id) {
			cluster.workers[id].on('message', function messageHandler(msg) {
				redisSetter.set('statistics:collected-last', msg);
				redisPublisher.publish('statistics:collected', statisticsCollected);

				statisticsCollected++;

				if(statisticsCollected == Object.keys(cluster.workers).length) {
					socket.emit('finished collection');
					console.log('Finished collection');
					redisPublisher.publish('statistics:collected', -1);
				}
			});
		});
	});

} else {
	var programNum = parseInt(process.env.programNum) + 1;
	var cyclesNum = process.env.cyclesNum;
	worker.run(program, programNum, cyclesNum);
}

function collector(workersNum, cyclesNum) {
	for (var i = 0; i < workersNum; i++) {
		cluster.fork({
			programNum: i,
			cyclesNum: cyclesNum
		});
	}
}
