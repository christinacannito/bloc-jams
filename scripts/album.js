var albumPicasso = {
	name: 'The Colors',
	artist: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl: 'assets/images/album_covers/01.png',
	songs: [
		{name: 'Blue', length: '4:26'},
		{name: 'Green', length: '3:14'},
		{name: 'Red', length: '5:01'},
		{name: 'Pink', length: '3:21'},
		{name: 'Magenta', length: '2:15'}
	]
};

var ablumMarconi = {
	name: 'The Telephone',
	artist: 'Guglielmo Marconi',
	label: 'EM',
	year: '1901',
	albumArtUrl: 'assets/images/album_covers/20.png',
	songs: [
		{name: 'Hello, Operator?', length: '1:01'},
		{name: 'Ring, ring, ring', length: '5:01'},
		{name: 'Fits in your pocket', length: '3:21'},
		{name: 'Can you hear me now?', length: '3:14'},
		{name: 'Wrong phone number', length: '2:15'}
	]
};

var ablumBeatles = {
	name: 'The White Album',
	artist: 'The Beatles',
	label: 'Apple',
	year: '1968',
	albumArtUrl: 'assets/images/album_covers/20.png',
	songs: [
		{name: 'The Continuing Story of Bungalow Bill', length: '3:14'},
		{name: 'While My Guitar Gently Weeps', length: '4:45'},
		{name: 'Happiness Is A Warm Gun', length: '2:43'},
		{name: 'Im So Tired', length: '2:03'},
		{name: 'Rocky Raccoon', length: '3:33'}
	]
};

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
		var songNumber = $(this).attr('data-song-number');

		if (currentlyPlayingSong !== null) {
			// Revert to song number for currently playing song because user started playing new song.
			var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
			currentlyPlayingCell.html(currentlyPlayingSong);
		}
		if (currentlyPlayingSong !== songNumber) {
			// Switch from Play -> Pause button to indicate new song is playing.
			$(this).html(pauseButtonTemplate);
			currentlyPlayingSong = songNumber;
		} else if (currentlyPlayingSong === songNumber) {
			// Switch from Pause -> Play button to pause currently playing song.
			$(this).html(playButtonTemplate);
			currentlyPlayingSong = null;
		}
	}

	var onHover = function(event) {
		//placeholder function logic
	};

	var offHover = function(event){
		//placeholder function logic
	}

	$row.find('.song-item-number').click(clickHandler);
	$row.hover(onHover, offHover);
	return $row;
};

var setCurrentAlbum = function(album){
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

var child = document.getElementsByClassName('album-view-title')[0];
var noParent = document.querySelector('html');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"</span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// store state of playing songs 
var currentlyPlayingSong = null;

$(document).ready(function(){
	setCurrentAlbum(albumPicasso);
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
