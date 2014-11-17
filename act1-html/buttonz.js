// Stackoverflow FTW!  http://stackoverflow.com/questions/20318822/how-to-create-a-stopwatch-using-javascript

var Stopwatch = function(elem, options) {

  var offset,
      clock,
      interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // initialize
  reset();

  // private functions
  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function getElapsed() {
      return clock/1000;
  }

  function reset() {
    clock = 0;
  }

  function update() {
    clock += delta();
  }

  function delta() {
    var now = Date.now(),
        d   = now - offset;

    offset = now;
    return d;
  }

  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
  this.getElapsed = getElapsed;
};

var sleepWatch = new Stopwatch(document.getElementById('Sleep'));
var workWatch = new Stopwatch(document.getElementById('Work'));
var playWatch = new Stopwatch(document.getElementById('Play'));

var svg = d3.select("body")
	.append("svg")
	.append("g")

svg.append("g")
	.attr("class", "slices");
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");

var width = 640,
    height = 400,
	radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var key = function(d){ return d.data.label; };
var transition_delay = 1; // was 1000

var color = d3.scale.ordinal()
	.domain(["Sleep", "Work", "Play"])
	.range(["#98abc5", "#8a89a6", "#7b6888"]);

var states = [ { label: 'Sleep', timer: sleepWatch },
               { label: 'Work',  timer: workWatch },
               { label: 'Play',  timer: playWatch } ];

change(getData());

setInterval(function() {
  change(getData());
}, 50);

function getData() {
  return states.map(function (el) {
    return { label: el.label, value: 0.01 + el.timer.getElapsed() }
  })
}

function stopAll() {
  states.forEach( function(el) { el.timer.stop(); } );
}

function startCurrent() {
  var id = this.id;

  states.forEach(function (el) {
    if (el.label === id) {
      el.timer.start();
    } else {
      el.timer.stop();
    }
  })
}

function resetAll() { // todo : reset everything!
  states.forEach( function(el) { el.timer.reset(); } );
}

d3.selectAll('.statez').on('click', startCurrent);

d3.selectAll('#Stop').on('click', stopAll);
d3.selectAll('#Reset').on('click', resetAll);

function change(data) {

	/* ------- PIE SLICES -------*/
	var slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(data), key);

	slice.enter()
		.insert("path")
		.style("fill", function(d) { return color(d.data.label); })
		.attr("class", "slice");

	slice
		.transition().duration(transition_delay)
		.attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		})

	slice.exit()
		.remove();

	/* ------- TEXT LABELS -------*/

	var text = svg.select(".labels").selectAll("text")
		.data(pie(data), key);

	text.enter()
		.append("text")
		.attr("dy", ".35em")
		.text(function(d) {
			return d.data.label;
		});

	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text.transition().duration(transition_delay)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		});

	text.exit()
		.remove();

	/* ------- SLICE TO TEXT POLYLINES -------*/

	var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(data), key);

	polyline.enter()
		.append("polyline");

	polyline.transition().duration(transition_delay)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};
		});

	polyline.exit()
		.remove();
};
