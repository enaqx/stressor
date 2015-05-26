/**
 * Area Chart Public Interface
 */

'use strict';

var d3 = require('d3');

var data = [
  {date: '30-Apr-12', close:  583.98},
  {date: '27-Apr-12', close:  603.00},
  {date: '26-Apr-12', close:  607.70},
  {date: '25-Apr-12', close:  610.00},
  {date: '24-Apr-12', close:  560.28},
  {date: '23-Apr-12', close:  571.70},
  {date: '20-Apr-12', close:  572.98},
  {date: '19-Apr-12', close:  587.44},
  {date: '18-Apr-12', close:  608.34},
  {date: '17-Apr-12', close:  609.70},
  {date: '16-Apr-12', close:  580.13}
];


var areaChart = {};

areaChart.create = function(el, props, state) {
  var parseDate = d3.time.format("%d-%b-%y").parse;

  var x = d3.time.scale()
      .range([0, props.width]);

  var y = d3.scale.linear()
      .range([props.height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var area = d3.svg.area()
      .x(function(d) { return x(d.date); })
      .y0(props.height)
      .y1(function(d) { return y(d.close); });

  var svg = d3.select('body').append('svg')
      				.attr('width', props.width)
      				.attr('height', props.height);

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

  svg.append("path")
     .datum(data)
     .attr("class", "area")
     .attr("d", area);

  svg.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + props.height + ")")
     .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

	/* var svg = d3.select(el).append('svg')
							.attr('class', 'd3')
							.attr('width', props.width)
              .attr('height', props.height);

  svg.append('g')
     .attr('class', 'area');

	this.update(el, state); */
}

areaChart.update = function(el, state) {
  var scales = this._scales(el, state.domain);
  this._draw(el, scales, state.data);
}

areaChart.destroy = function(el) {
}

areaChart._scales = function(el, domain) {
  if (!domain) {
    return null;
  }

  var width = el.offsetWidth;
  var height = el.offsetHeight;

  var x = d3.scale.linear()
            .range([0, width])
            .domain(domain.x);

  var y = d3.scale.linear()
            .range([height, 0])
            .domain(domain.y);

  var z = d3.scale.linear()
            .range([5, 20])
            .domain([1, 10]);

  return {x: x, y: y, z: z};
}

areaChart._draw = function(el, scales, data) {
  var g = d3.select(el).selectAll('.area');

  var point = g.selectAll('.area-point')
    .data(data, function(d) {
      return d.id;
    });

  point.enter().append('re')
       .attr('class', 'd3-point');

  point.attr('cx', function(d) { return scales.x(d.x); })
       .attr('cy', function(d) { return scales.y(d.y); })
       .attr('r',  function(d) { return scales.z(d.z); });

  point.exit().remove();
}

module.exports = areaChart;
