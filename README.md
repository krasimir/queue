# Yet another JavaScript queue library

I'm currently working on an animation-heavy web application. There are long chains of CSS transitions/animations, which I have to do. I wrote this little library, because I needed something lightweight with minimalistic API. I think that it deserves its own [repository](https://github.com/krasimir/queue) and I created one.

## The problem

One of the widely used methods for applying [CSS transitions or animations](http://krasimirtsonev.com/blog/article/Introduction-to-animations-in-HTML-css3-transitions-keyframes) is by adding/removing CSS classes. So, here is some pseudo code:

	var logo = $(".logo");
	var banner = $(".banner");
	setTimeout(function() {
		logo.addClass("move-it");
	}, 1000);
	setTimeout(function() {
		logo.removeClass("move-it");
		banner.addClass("colorize");
	}, 2400);
	setTimeout(function() {
		banner.removeClass("colorize");
	}, 3500);

So, it works, but it's a little bit dummy and ugly. A lot of code. If we add more actions we will end up with complex calculations of the times. Also it is difficult to control the whole animation. For example, what if I want to stop it. As you can see I'm using jQuery, so the first logical move is to involve the *queue* function. Something like this may work:

	$( "div" )
	.delay(1000)
	.queue(function(next) {
	    logo.addClass("red");
	    next();
	})
	.delay(1400)
	.queue(function(next) {
	    logo.removeClass("red");
	    banner.addClass("green");
	    next();
	})
	.delay(1100)
	.queue(function(next) {
	    banner.removeClass("green");
	    next();
	});

This looks a little bit better, because the timing is clear enough. However there are still some syntax sugar, like *next*, *queue* and *delay*. Again the stopping of the animations is a little bit tricky. Also I need to use a jQuery object to start from, which looks weird. So, I spend around two hours and I wrote [queue library](https://github.com/krasimir/queue).

## The library

