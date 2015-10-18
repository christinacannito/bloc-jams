var pointsArray = document.getElementsByClassName('point');

var revealPoints = function(point) {
	point.style.opacity = 1;
	point.style.transform = "scaleX(1) translateY(0)";
	point.style.msTransform = "scaleX(1) translateY(0)";
	point.style.WebkitTransform = "scaleX(1) translate(0)";
}


var animatePoints = function(points) {
	console.log('points: ', points)
	forEach(points, revealPoints);
};

window.onload = function() {
	var sellingPoints = document.getElementsByClassName('selling-points')[0];
	console.log('sellingPoints: ', document.getElementsByClassName('selling-points'));
	console.log('length: ', sellingPoints.length);
	var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
	
	if (window.innerHeight > 950) {
		animatePoints(pointsArray);
	}

	window.addEventListener('scroll', function(event){
		// console.log('current offset from the top is ' + sellingPoints.getBoundingClientRect().top + ' pixels');
		if(document.body.scrollTop >= scrollDistance) {
			animatePoints(pointsArray);
		}
	});
}

// animatePoints();