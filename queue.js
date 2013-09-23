var queue = function() {
	var api = null, self = this;
	var	queueElements = [], queueElementsSource = [];
	var	isNumber = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); };
	var flags = {}, interval = null;
	var processing = function() {
		if(queueElements.length > 0) {
			var item = queueElements.shift();
			if(flags.stop !== true) {
				if(isNumber(item)) { // delay
					interval = setTimeout(function() {
						api();
					}, item);
				} else if(typeof item === 'function') { // functions
					item();
					api();
				}
			} else {
				clearTimeout(interval);
			}
		} else {
			if(typeof flags.callback !== 'undefined') flags.callback();
			if(flags.loop) {
				queueElements = [];
				for(var i=0; el=queueElementsSource[i]; i++) {
					queueElements.push(el);
				}
				api();
			}
		}	
	}
	var filling = function() {
		var item = arguments[0];
		if(isNumber(item) || typeof item === 'function') {
			queueElements.push(item);
			queueElementsSource.push(item);	
		} else if(typeof item === 'string') {
			flags[item] = arguments[1] || true;
		}
	}
	return api = function() {
		arguments.length === 0 ? processing() : filling.apply(self, arguments);
		return api;
	}
	return api;
}

if(typeof module !== "undefined") module.exports = queue;