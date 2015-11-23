var revealPoints = function(point) {
	point.style.opacity = 1;
	point.style.transform = "scaleX(1) translateY(0)";
	point.style.msTransform = "scaleX(1) translateY(0)";
	point.style.WebkitTransform = "scaleX(1) translate(0)";
}


var animatePoints = function() {
	console.log('in anmate points');
	var revealPoint = function(){
		$(this).css({
			opacity: 1, 
			transform: 'scaleX(1) translateY(0)'
		});
	};
	$.each($('.point'), revealPoint);
};

$(window).load(function() {
	
	if ($(window).height() > 950) {
		animatePoints();
	}

	var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

	$(window).scroll(function(event){
		// console.log('current offset from the top is ' + sellingPoints.getBoundingClientRect().top + ' pixels');
		if($(window).scrollTop >= scrollDistance) {
			animatePoints();
		}
	});
});