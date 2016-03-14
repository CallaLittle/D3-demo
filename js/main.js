/* 575 boilerplate main.js */

window.onload = function() {
	var w = 900, h = 500;
	var container = d3.select('body')
		.append('svg')
		.attr({class: 'container', width: w, height: h});
	var rectangle = container.append('rect')
		.datum(400)
		.attr('class', 'rectangle')
		.attr('width', function(d) {
			return d *2
		})
		.attr('height', function(d) {
			return d; 
		})
		.attr('x', 50)
		.attr('y', 50)
		.style('fill', '#FFF');
	
	var cityPopulation = [

		{
			city: 'Nashville',
			pop: 659042
		},

		{
			city: 'Miami',
			pop: 417650
		},

		{
			city: 'Phoenix',
			pop: 1513000
		},

		{
			city: 'Atlanta',
			pop: 447841
		}
		
	];

	var circles = container.selectAll('.circles')
		.data(dataArray)
		.enter()
		.append('circle')
		.attr('class', 'circles')
		.attr('r', function(d, i) {
			console.log(d + " " + i);
			return d;
		})
		.attr('cx', function(d, i) {
			return 70 + (i * 180);
		})
		.attr('cy', function(d) {
			return 450 - (d * 5);
		});
};
