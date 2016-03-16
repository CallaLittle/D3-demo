/* 575 boilerplate main.js */

//run function when window loads
window.onload = function() {

	//variables to hold width and height of outer svg container
	var w = 925, h = 505;

	//create the svg in the body of the html
	var container = d3.select('body')
		.append('svg')
		.attr({class: 'container', width: w, height: h});

	//add a rectangle to the svg
	var rectangle = container.append('rect')
		.datum(400)
		.attr('class', 'rectangle')
		.attr('width', function(d) {
			return d *2
		})
		.attr('height', function(d) {
			return d; 
		})
		.attr('x', 62.5)
		.attr('y', 52.5)
		.style('fill', '#FFF');
	
	//city population dataset
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

	//scale for the x axis
	var x = d3.scale.linear()
		.range([115, 745])
		.domain([0, 3]);

	//calculate min and max population in dataset
	var minPop = d3.min(cityPopulation, function(d) {
		return d.pop;
	});

	var maxPop = d3.max(cityPopulation, function(d) {
		return d.pop;
	});

	//scale for the y axis
	var y = d3.scale.linear()
		.range([452.5, 52.5])
		.domain([0, 1800000]);

	//scale for the color range of the circles
	var color = d3.scale.linear()
		.range(['#377603',  '#546ebf'])
		.domain([minPop, maxPop]);

	//create circles based on city population data
	var circles = container.selectAll('.circles')
		.data(cityPopulation)
		.enter()
		.append('circle')
		.attr('class', 'circles')
		.attr('id', function(d) {
			return d.city;
		})
		.attr('r', function(d, i) {
			var area = d.pop * 0.005;
            return Math.sqrt(area/Math.PI);
		})
		.attr('cx', function(d, i) {
			return x(i);
		})
		.attr('cy', function(d) {
			return y(d.pop);
		})
		.style('fill', function(d) {
			return color(d.pop);
		})
		.style('stroke', '#000');

	//create a y axis label
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient('left');

	//container to hold the y axis
	var axis = container.append('g')
		.attr('class', 'axis')
		.attr('transform', 'translate(61, 0)')
		.call(yAxis);

	//chart title
	var title = container.append('text')
		.attr('class', 'title')
		.attr('text-anchor', 'middle')
		.attr('x', 462)
		.attr('y', 35)
		.text('City Populations');

	//circle labels
	var labels = container.selectAll('.labels')
		.data(cityPopulation)
		.enter()
		.append('text')
		.attr('class', 'labels')
		.attr('text-anchor', 'left')
		.attr('y', function(d) {
			return y(d.pop) - 4
		});

	//circle label city name text
	var nameLine = labels.append('tspan')
		.attr('class', 'nameLine')
		.attr('x', function(d, i) {
			return x(i) + Math.sqrt(d.pop * .005 /Math.PI) + 5;
		})
		.text(function(d) {
			return d.city 
		});

	//format for city population
	var format = d3.format(",");

	//circle label for city population text
	var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            return x(i) + Math.sqrt(d.pop * 0.005 / Math.PI) + 5;
        })
        .attr("dy", "15") 
        .text(function(d){
            return "Pop. " + format(d.pop);
        });
};

