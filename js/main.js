/* 575 boilerplate main.js */

window.onload = function() {
	var w = 900, h = 500;
	var container = d3.select('body')
		.append('svg')
		.attr({class: 'container', width: w, height: h});
	var rectange = container.append('rect')
		.datum(400)
		.attr('width', function(d) {
			return d *2
		})
		.attr({class: 'rectangle', height: 250});
	console.log(d);
};