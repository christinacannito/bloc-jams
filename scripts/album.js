var createSongRow = function(songNumber, songName, songLength) {
	var template = 
		'<tr class="album-view-song-item">'
		+ ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
		+ ' <td class="song-item-title">' + songName + '</td>'
		+ ' <td class="song-item-duration">' + songLength + '</td>'
		+ '<tr>'
		;

	var $row = $(template);

	var clickHandler = function(){
		var songNumber = parseInt($(this).attr('data-song-number'));

		if (currentlyPlayingSongNumber !== null) {
			// Revert to song number for currently playing song because user started playing new song.
			var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
			currentlyPlayingCell.html(currentlyPlayingSongNumber);
		}
		if (currentlyPlayingSongNumber !== songNumber) {
			// Switch from Play -> Pause button to indicate new song is playing.
			$(this).html(pauseButtonTemplate);
			currentlyPlayingSongNumber = songNumber;
			currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
			updatePlayerBarSong();
		} else if (currentlyPlayingSongNumber === songNumber) {
			// Switch from Pause -> Play button to pause currently playing song.
			$(this).html(playButtonTemplate);
			$('.main-controls .play-pause').html(playerBarPlayButton);
			currentlyPlayingSongNumber = null;
			currentSongFromAlbum = null;
		}
	}

	var onHover = function(event) {
		//placeholder function logic
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));
		console.log('songNumber: ', songNumber)
		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(playButtonTemplate);
		}
	};

	var offHover = function(event){
		//placeholder function logic
		console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));

		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(songNumber);
		}
	};

	$row.find('.song-item-number').click(clickHandler);
	$row.hover(onHover, offHover);
	return $row;
};

var setCurrentAlbum = function(album){
	currentAlbum = album;
	var $albumTitle = $('.album-view-title');
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');
	var $albumImage = $('.album-cover-art');
	var $albumSongList = $('.album-view-song-list');

	$albumTitle.text(album.name);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + ' ' + album.label);
	$albumImage.attr('src', album.albumArtUrl);

	$albumSongList.empty();

	for(i = 0; i < album.songs.length; i++) {
		var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
		$albumSongList.append($newRow);
	}
};

var trackIndex = function(album, song) {
	return album.songs.indexOf(song);
}

var nextSong = function() {
	
	var getLastSongNumber = function(index){
		console.log('index: ', index);
		return index == 0 ? currentAlbum.songs.length : index;
	};

	var currentSongIndex = parseInt(trackIndex(currentAlbum, currentSongFromAlbum)); 
	console.log('currentSongIndex: ', currentSongIndex);

	currentSongIndex ++;

	if(currentSongIndex >= currentAlbum.songs.length) {
		currentSongIndex = 0;
	}

	// set a new current song
	currentlyPlayingSongNumber = currentSongIndex + 1;
	currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

	// update the player bar information
	$('.currently-playing .song-name').text(currentSongFromAlbum.name);
	$('.currently-playing .artist-name').text(currentAlbum.artist);
	$('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name)
	$('.main-controls .play-pause').html(playerBarPauseButton);

	var lastSongNumber = parseInt(getLastSongNumber(currentSongIndex));
	console.log('lastSongNumber: ', lastSongNumber);
	var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
	var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

	$nextSongNumberCell.html(pauseButtonTemplate);
	$lastSongNumberCell.html(lastSongNumber);
}

var previousSong = function() {

	var getLastSongNumber = function(index) {
		console.log('index 2: ', index);
		return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
	};

	var currentSongIndex = parseInt(trackIndex(currentAlbum, currentSongFromAlbum));

	console.log('currentSongIndex: ', currentSongIndex);

	currentSongIndex--;

	if(currentSongIndex < 0) {
		currentSongIndex = currentAlbum.songs.length - 1;
	}

	// set a new current song
	currentlyPlayingSongNumber = currentSongIndex + 1;
	currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

	// update the player bar information 
	$('.currently-playing .song-name').text(currentSongFromAlbum.name);
	$('.currently-playing .artist-name').text(currentAlbum.artist);
	$('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
	$('.main-controls .play-pause').html(playerBarPauseButton);

	var lastSongNumber = parseInt(getLastSongNumber(currentSongIndex));
	var $previousSongNumberCell = $('.song-item-number[data-song="' + currentlyPlayingSongNumber + '"]');
	var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]')

	$previousSongNumberCell.html(pauseButtonTemplate);
	$lastSongNumberCell.html(lastSongNumber)
}

var updatePlayerBarSong = function(){
	$('.currently-playing .song-name').text(currentSongFromAlbum.name);
	$('.currently-playing .artist-name').text(currentAlbum.artist);
	$('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
	$('.main-controls .play-pause').html(playerBarPauseButton);
}

var child = document.getElementsByClassName('album-view-title')[0];
var noParent = document.querySelector('html');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"</span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// store state of playing songs 
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function(){
	setCurrentAlbum(albumPicasso);
	$previousButton.click(previousSong);
	$nextButton.click(nextSong);
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
		setCurrentAlbum(albumCovers[clickedCounter]);
	}	else if (clickedCounter === albumCovers.length) {
		clickedCounter = 0;
		setCurrentAlbum(albumCovers[clickedCounter]);
	}
	clickedCounter += 1;
}
