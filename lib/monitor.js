/**
 * Monitor
 */

'use strict';

var Monitor = function() {
	this.clear();
}

Monitor.prototype.getData = function () {
	return {
		data: this.data,
		incrMap: this.incrMap
	}
}

Monitor.prototype.clear = function () {
	this.data = {},
	this.incrMap = {}
}

Monitor.prototype.set = function (name, value) {
	this[name] = value;
}

Monitor.prototype.start = function (name, id) {
	if(!this.data.hasOwnProperty(id)) {
		this.data[id] = {};
	}

	this.data[id][name] = {
		startTime: new Date().getTime(),
		endTime: null
	}
}

Monitor.prototype.end = function (name, id) {
	if(!this.data.hasOwnProperty(id)) {
		this.data[id] = {};
		this.data[id][name] = {
			startTime: null,
			endTime: null
		}
	} else if(!this.data[id].hasOwnProperty(name)) {
		this.data[id][name] = {
			startTime: null,
			endTime: null
		}
	}
	this.data[id][name].endTime = new Date().getTime();
}

Monitor.prototype.incr = function (name) {
	this.incrMap[name] = this.incrMap[name] == null ? 1 : this.incrMap[name] + 1;
}

Monitor.prototype.decr = function (name) {
	this.incrMap[name] = this.incrMap[name] == null ? 0 : this.incrMap[name] - 1;
}

module.exports = Monitor;
