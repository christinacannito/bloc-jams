var animatePoints = function() {
	var points = document.getElementsByClassName('point');

	var revealPoints = function(pointsArray) {
		for(var i = 0; i < pointsArray.length; i++){
			console.log('here')
			pointsArray[i].style.opacity = 1;
			pointsArray[i].style.transform = "scaleX(1) translateY(0)";
			pointsArray[i].style.msTransform = "scaleX(1) translateY(0)";
			pointsArray[i].style.WebkitTransform = "scaleX(1) translate(0)";
		}
	}

	revealPoints(points);

};

animatePoints();