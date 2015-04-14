/**
 * Worker 
 */

'use strict';

var fs = require('fs');
var vm = require('vm');

var redis = require('redis');

var monitor = require('./monitor');

var redisHOST = '127.0.0.1';
var redisPORT = 6379;
var redisClient = redis.createClient(redisPORT, redisHOST);

var sandbox = {
	async: require('async'),
	Buffer: Buffer,
	console: console,
	crypto: require('crypto'),
	cluster: require('cluster'),
	net: require('net'),
	process: process,
	redisClient: redisClient,
	statistics: new monitor,
	cycle: 0,
	programNum: 0,
};

var workerStress = {
	run: function(program, programNum) {

		sandbox.programNum = programNum;

		var scenario = fs.readFileSync(program.scenario).toString();

		for (var i = 1; i <= program.cycles; i++) {
			console.log('=== Cycle #' + i + ' for Worker #' + process.pid + ' ===');

			try {
				// setMaxListeners to 0 to inlimited listeners amount
				sandbox.cycle = i;
				vm.runInNewContext(scenario, sandbox).setMaxListeners(0);
			} catch (exception) {
				console.error(exception);
			} 
		}

		setTimeout(function() {
			console.log('Statistics for worker #' + process.pid);
			sandbox.statistics.worker = process.pid; 
			process.send(JSON.stringify(sandbox.statistics));
		}, 1000);

	} 
}

module.exports = workerStress;
