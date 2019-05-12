var maxStars = 20;
var stars;

function randomizeNumber(min, max) {
	return (Math.random() * (max - min)) + min;
}

function makeStars() {
	for(stars=0; stars<maxStars; stars++){
		var minSize = 1;
		var maxSize = 5;
		var minTop = $("#header").height();
		var maxTop = $("#main").height() - $("#contact").height();
		var minLeft = 0;
		var maxLeft = $("#main").width();
		console.log(maxLeft);

		//Randomized variables within a certain range
		var top = randomizeNumber(minTop, maxTop);
		var left = randomizeNumber(minLeft, maxLeft);
		var size = randomizeNumber(minSize, maxSize);

		//Possible glow animations
		var glowSpeedValues = ["1s", "1.5s", "2s"];
		var glowSpeed = glowSpeedValues[Math.floor(Math.random() * glowSpeedValues.length)];

		var opacityValues = ["0.25", "0.5", "0.75"];
		var opacity = opacityValues[Math.floor(Math.random() * opacityValues.length)];

		//Referenced https://stackoverflow.com/questions/268490/jquery-document-createelement-equivalent
		var star = $(document.createElement('div'));
		star.addClass("star");
		star.css({
			"height": size + "px",
			"width": size + "px",
			"top": top + "px",
			"left": left + "px",
			"border": "1px solid white",
			"opacity": opacity,
			"animation" : `glow ${glowSpeed} infinite linear`
		});

		$("#main").append(star);
	}
} //end of makeStar

$(document).ready(function() {
	makeStars();
}); //end of document ready

//regenerates stars on window resize
$(window).resize(function() {
	$("div.star").remove();
    makeStars();
});
