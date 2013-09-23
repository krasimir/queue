describe("Testing library", function() {

	var queue = require("../queue.js");

	it("Should run functions in queue", function(done) {
		var value = 0;
		queue()(function() {
			value += 1;
		})(200)(function() {
			value += 1;
		})(200)(function() {
			value += 1;
		})();
		setTimeout(function() {
			expect(value).toBe(3);
			done();
		}, 500);
	});

	it("Should call the callback", function(done) {
		var value = 0;
		var onEnd = function() {
			expect(value).toBe(20);
			done();
		}
		queue()(1000)(function() {
			value += 10;
		})(500)(function() {
			value += 10;
		})("callback", onEnd)();
	});

	it("Should stop the queue", function(done) {
		var value = 0;
		var q = queue()(500)(function() {
			value += 2;
		})(500)(function() {
			value += 2;
		})(500)(function() {
			value += 2;
		})(500)(function() {
			value += 2;
		})(500)();
		setTimeout(function() {
			q("stop");
			expect(value).toBe(4);
		}, 1200);
		setTimeout(function() {
			expect(value).toBe(4);
			done();
		}, 3000);
	});

});