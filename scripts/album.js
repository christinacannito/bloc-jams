function setSong(songNumber) { // songNumber = currentSongIndex + 1
	console.log('currentSoundFile: ', currentSoundFile);
	if (currentSoundFile) {
		currentSoundFile.stop();
	}
	currentlyPlayingSongNumber = parseInt(songNumber);
	// originally set to null - then it gets reasigned the index number of the song it is on in the array
	console.log('currentSongFromAlbum: ', currentSongFromAlbum)
	currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
	console.log('setSong currentSongFromAlbum: ', currentSongFromAlbum);
	currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
		formats: ['mp3'],
		preload: true // this just means that they load as soon as the page loads...why does this have to be specified
	}); // why do we need this? this seems overly complicated...
	
	setVolume(currentVolume);

	// assigns currentlyPlayingSongNumber and currentSongFromAlbum a new value based on the new song number.

}
	// then replace all the instances where we manually assing values to these functions with a call to this function setSong

var setVolume = function(volume) {
	if(currentSoundFile) {
		currentSoundFile.setVolume(volume);
	}
}

var togglePlayFromPlayerBar = function () {
	// if the song is paused do something
	console.log('correct button clicked');
	//console.log('currentSoundFile.isPaused() === true', currentSoundFile.isPaused() === true)
	
	console.log('currentSoundFile: ', currentSoundFile);
	console.log('currentlyPlayingSongNumber: ', currentlyPlayingSongNumber) // so you are able to get the currently playing song number 
	console.log('selecting right element: ', $('.song-item-number[data-song-number=' + currentlyPlayingSongNumber + '] span'))
	// if ( $('.song-item-number').attr('data-song-number')  == currentlyPlayingSongNumber) {
	// 	console.log('HELLLLOOOOO')
	// }


	if ( $('.song-item-number[data-song-number=' + currentlyPlayingSongNumber + '] span').hasClass('ion-pause') ) {
		console.log('has class with pause!!');
	} else {
		console.log('has class with play!!!!')
	}

	if(currentSoundFile === null) { // when they click on the pause button
		console.log('finnnnnaly')
		console.log("it IS playing")
		
		$(this).html(pauseButtonTemplate);
		console.log('this for pause: ', $(this))
		$('.main-controls .play-pause').html(playerBarPauseButton);
		$('.song-item-number[data-song-number=' + currentlyPlayingSongNumber + '] span').removeClass('ion-play');
		$('.song-item-number[data-song-number=' + currentlyPlayingSongNumber + '] span').addClass('ion-pause');
		currentSoundFile.pause();
	} else if (currentSoundFile.isPaused() === true) {
		console.log('it is NOT playing');

		$(this).html(pauseButtonTemplate);
		console.log('this for pause: ', $(this))
		$('.main-controls .play-pause').html(playerBarPauseButton);
		$('.song-item-number[data-song-number=' + currentlyPlayingSongNumber + '] span').removeClass('ion-play');
		$('.song-item-number[data-song-number=' + currentlyPlayingSongNumber + '] span').addClass('ion-pause');
		currentSoundFile.play();
	} else {
		console.log("it IS playing")
		$(this).html(playButtonTemplate);
		$('.main-controls .play-pause').html(playerBarPlayButton); // the function being called here
		// console.log('currentSoundFile.isPaused()', currentSoundFile.isPaused())
		$('.song-item-number[data-song-number=' + currentlyPlayingSongNumber + '] span').removeClass('ion-pause');
		$('.song-item-number[data-song-number=' + currentlyPlayingSongNumber + '] span').addClass('ion-play');

		currentSoundFile.pause();
	} // if the song is playing do something else
}

function getSongNumberCell(number) {
	return $('.song-item-number[data-song-number="' + number + '"]');
	// returns the song number element that corresponds to that song number;
}

var createSongRow = function(songNumber, songName, songLength) {
	var template = 
		'<tr class="album-view-song-item">'
		+ ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
		+ ' <td class="song-item-title">' + songName + '</td>'
		+ ' <td class="song-item-duration">' + songLength + '</td>'
		+ '<tr>'
		;

	var $row = $(template);

	var clickHandler = function(){ // small play button
		// attached as a click listener - because attached to the button 
		// variable name space when a function/variable is used only for a particular function
		console.log('the play/pause button pressed');
		var songNumber = parseInt($(this).attr('data-song-number')); // 
		// where does the data-song-number come from? 
		// this comes from the template above and the number is the songNumber variable which is created 
		// when the createSongRow function runs in the setCurrentAlbum function

		console.log('song number inside clickHandler: ', songNumber);
		if (currentlyPlayingSongNumber !== null) { // was the song already playing 
			// where does the currentlyPlayingSongNumber come from? 
			// this variable is originally set to null above document ready
			// - then where does it get set? 
			// it gets asigned a number in the nextSong function

			// Revert to song number for currently playing song because user started playing new song.
			var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber)
			currentlyPlayingCell.html(currentlyPlayingSongNumber);
		}
		if (currentlyPlayingSongNumber !== songNumber) { // songNumber is what you clicked on and currentlyplayingsongnumber can be anything else in the list 
			// Switch from Play -> Pause button to indicate new song is playing.
			setSong(songNumber);
			currentSoundFile.play();
			$(this).html(pauseButtonTemplate);
			//currentlyPlayingSongNumber = songNumber; // songNumber defined above 
			
			// currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
			console.log('currentSongFromAlbum (getting set): ', currentSongFromAlbum);

			updatePlayerBarSong(); // updatePlayerBarSong is called - updates the bottom of page
		} else if (currentlyPlayingSongNumber === songNumber) {
			// Switch from Pause -> Play button to pause currently playing song.
			// $(this).html(playButtonTemplate);
			// $('.main-controls .play-pause').html(playerBarPlayButton); 
			// updatePlayerBarSong is called - updates the bottom of page
			// NOT sure why you need the .html function again...
			// setSong(null);
			// currentlyPlayingSongNumber = null;
			// currentSongFromAlbum = null;
			if (currentSoundFile.isPaused()) { // if it is paused (true)
				$(this).html(pauseButtonTemplate);
				$('.main-controls .play-pause').html(playerBarPauseButton);
				// console.log('currentSoundFile.isPaused()', currentSoundFile.isPaused())
				currentSoundFile.play();
			} else { // if it was false
				$(this).html(playButtonTemplate);
				$('.main-controls .play-pause').html(playerBarPlayButton);
				currentSoundFile.pause();
			}
		}
	}

	var onHover = function(event) {
		//placeholder function logic
		var songNumberCell = $(this).find('.song-item-number');
		console.log('songNumberCell inside onHover: ', songNumberCell);
		// what is song number cell? Where is song-item-number coming from?
		// this is coming from the template at the top of the document and the number changes by...
		// the setCurrentAlbum function sets this number where the createSongRow function is called 
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));
		console.log('songNumber: ', songNumber)
		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(playButtonTemplate);
		}
	};

	var offHover = function(event){
		//placeholder function logic
		// console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));

		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(songNumber);
		}
	};

	$row.find('.song-item-number').click(clickHandler); // how the click handler gets attached to the song 
	$row.hover(onHover, offHover); // hover takes two functions, first one is when hovers over an element and then will fire sencond function when it goes off 
	return $row;
};

var setCurrentAlbum = function(album){
	// the first time the page loads this is set up as default in the document ready function to be the picasso album
	currentAlbum = album;
	var $albumTitle = $('.album-view-title');
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');
	var $albumImage = $('.album-cover-art');
	var $albumSongList = $('.album-view-song-list'); // this is the container for the list of songs 

	$albumTitle.text(album.name);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + ' ' + album.label);
	$albumImage.attr('src', album.albumArtUrl);

	$albumSongList.empty(); // emptys out the html

	for(i = 0; i < album.songs.length; i++) { // songs is a key of the albums object - value is array
		var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
		$albumSongList.append($newRow); // albumsonglist is a container and gets appended with the new row (from the template)
	} // loops through songs in an album 
};

var trackIndex = function(album, song) {
	// for example this gets called in nextSong 
	// "currentAlbum" is passed in for album and "currentSongFromAlbum" is passed in for song
	return album.songs.indexOf(song);
	// what does indexOf do?
	// returns the index number of where that element is located in the array
}
// why do we need this helper function?

var nextSong = function() {
	
	var getLastSongNumber = function(index){
		console.log('index: ', index);
		return index == 0 ? currentAlbum.songs.length : index; // why is this short hand? Not sure how this is getting evaluated and why...
		// why are we keeping track of the lastSongNumber?
	};

	var currentSongIndex = parseInt(trackIndex(currentAlbum, currentSongFromAlbum));
	// where is that function: trackIndex...
	// That is the helper function!! 
	// just returns an index number

	console.log('currentSongIndex: ', currentSongIndex);

	currentSongIndex++;

	if(currentSongIndex >= currentAlbum.songs.length) {
		// resetting currentSongIndex to zero if it is greater than or equal to current.songs.length 
		currentSongIndex = 0;
	}

	// set a new current song
	setSong(currentSongIndex + 1); // songNumber = currentSongIndex + 1
	currentSoundFile.play();
	updatePlayerBarSong();
	// currentlyPlayingSongNumber = currentSongIndex + 1; 
	// above is replaced...
	// now increasing the index number and going to the next song...
	// currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
	// NOTE: this currentSongIndex is from above where the number has now increased by one

	// update the player bar information
	// below these are set the same way the <h2> and other tags are filled with the artist information from the objects
	$('.currently-playing .song-name').text(currentSongFromAlbum.name);
	$('.currently-playing .artist-name').text(currentAlbum.artist);
	$('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name)
	$('.main-controls .play-pause').html(playerBarPauseButton);

	var lastSongNumber = parseInt(getLastSongNumber(currentSongIndex));
	// this function is defined at the start of this function
	// the currentSongIndex is also defined at the start of this function
	// currentSongIndex is set by having the trackIndex method called and passing in currentAlbum and currentSongFromAlbum
	// WHERE is the trackIndex function? 
	// that was the added helper function that just returns the index number.

	console.log('lastSongNumber: ', lastSongNumber);
	var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
	// updating the data-song-number with the currentlyPlayingSongNumber

	var $lastSongNumberCell =  getSongNumberCell(lastSongNumber);
	// updating the data-song-number with the lastSongNumber

	// here is where they put that new information that is stored in those variables is put into the html
	$nextSongNumberCell.html(pauseButtonTemplate);
	$lastSongNumberCell.html(lastSongNumber);
}
// end of next song
// QUESTION: this seems like a really complicated function? Does it have to be? Can it be potentially broken up into two functions?


var previousSong = function() {

	var getLastSongNumber = function(index) {
		console.log('index 2: ', index);
		return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
	};
	// why is this repeated here like it was in the next function above? 

	var currentSongIndex = parseInt(trackIndex(currentAlbum, currentSongFromAlbum));
	// same as in the next function

	console.log('currentSongIndex: ', currentSongIndex);

	currentSongIndex--;
	// here you are only subjecting from the index rather than adding 

	if(currentSongIndex < 0) {
		// will only get executed if the currentSongIndex is less than zero
		currentSongIndex = currentAlbum.songs.length - 1;
	}

	// set a new current song
	setSong(currentSongIndex + 1);
	currentSoundFile.play();
	updatePlayerBarSong();
	// currentlyPlayingSongNumber = currentSongIndex + 1;
	// currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

	// update the player bar information 
	// below is just updating the html data
	$('.currently-playing .song-name').text(currentSongFromAlbum.name);
	$('.currently-playing .artist-name').text(currentAlbum.artist);
	$('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
	$('.main-controls .play-pause').html(playerBarPauseButton);

	var lastSongNumber = parseInt(getLastSongNumber(currentSongIndex));
	// lastSongNumber is defined and set
	var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
	var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

	// here you are setting the html with the new information that is in those variables above
	$previousSongNumberCell.html(pauseButtonTemplate);
	$lastSongNumberCell.html(lastSongNumber)
}
// end of previous song 
// you would think that there would be more reusable code between the previous and next functions...why not? 

var updatePlayerBarSong = function(){
	$('.currently-playing .song-name').text(currentSongFromAlbum.name);
	// currently-playing is a container div set in the html document
	// song-name is the <h2> tag
	// so the <h2> tag is updated from the currentSongFromAlbum objuect then using the key "name" you get the value
	// how is currentSongFromAlbum set? 
	// at first it is set to "null"
	// then it gets a value currentAlbum.songs[songNumber - 1] in the clickHandler function
	// where is currentAlbum coming from? 
	// currentAlbum is original set to null 
	// then currentAlbum gets defined in setCurrentAlbum where it takes the value of what is passed into the function
	// an example is the first time the function is called the picasso album is passed in 

	$('.currently-playing .artist-name').text(currentAlbum.artist);
	// the same type of format happens here as above 
	// the only differences are where the data is going to 
	// so now updating the artists name 
	// that data is coming from the currentAlbum object 
	// where does currentAlbum come from? 
	// originally currentAlbum is set to null 
	// then it gets set inside setCurrentAlbum function
	
	$('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
	
	$('.main-controls .play-pause').html(playerBarPauseButton);
	// this one is for the bottom of the page the hold the play pause buttons
}

var child = document.getElementsByClassName('album-view-title')[0];
var noParent = document.querySelector('html');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"</span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>'; // this is for the info at the bottom
var playerBarPauseButton = '<span class="ion-pause"></span>'; // this is for the info at the bottom

// store state of playing songs 
var currentAlbum = null;
var currentlyPlayingSongNumber = null; // holds the index number the song is on in the array
var currentSongFromAlbum = null; // holds the song object
var currentSoundFile = null;
var currentVolume = 80;

// below just creating variable of the html elements so rather that writing $('.main-controls .previous') you can write $previousButton
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

var bottomControlBtn = $('.main-controls .play-pause'); 

$(document).ready(function(){
	setCurrentAlbum(albumPicasso);
	$previousButton.click(previousSong); // the variables that are defined above...these are just the html elements with a click event that takes in one function  
	$nextButton.click(nextSong);
	bottomControlBtn.click(togglePlayFromPlayerBar);
});

// get all the album covers

var albumArt = document.getElementsByClassName('album-cover-art');
console.log('album art: ', albumArt)

document.getElementsByClassName('album-cover-art')[0].addEventListener('click', moveCover);

// when the current album cover gets clicked this function is called
var clickedCounter = 0;
function moveCover() {
	var albumCovers = [ablumMarconi, ablumBeatles, albumPicasso]
	if (clickedCounter < albumCovers.length) {
		// clickCounter is defined above
		// as long as it is less then the albumCovers length the following will happen
		setCurrentAlbum(albumCovers[clickedCounter]);
		// so the ablum is set based on the index that it is on in the array
	}	else if (clickedCounter === albumCovers.length) {
		// if the clickedCounter is the same length as the albumCovers length then clickedCounter gets reset to zero
		clickedCounter = 0;
		setCurrentAlbum(albumCovers[clickedCounter]);
	}
	clickedCounter += 1;
	// everytime it is clicked the counter increases by one 
}


