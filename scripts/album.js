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

		return template;
};

var setCurrentAlbum = function(album){
	var albumTitle = document.getElementsByClassName('album-view-title')[0];
	var albumArtist = document.getElementsByClassName('album-view-artist')[0];
	var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
	var albumImage = document.getElementsByClassName('album-cover-art')[0];
	var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

	albumTitle.firstChild.nodeValue = album.name;
	albumArtist.firstChild.nodeValue = album.artist;
	albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
	albumImage.setAttribute('src', album.albumArtUrl);

	albumSongList.innerHTML = '';

	for(i = 0; i < album.songs.length; i++) {
		albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
	}
};

var findParentByClassName = function(element, targetClass) {
  var currentParent = element.parentElement;
  console.log('currentParent classname: ', currentParent.className);
  console.log('tagetClass: ', targetClass);
  while (currentParent.className !== targetClass) {
      currentParent = currentParent.parentElement;
  }
  return currentParent;
};

var getSongItem = function(element) {
  switch (element.className) {
      case 'album-song-button':
      case 'ion-play':
      case 'ion-pause':
          return findParentByClassName(element, 'song-item-number');
      case 'album-view-song-item':
          return element.querySelector('.song-item-number');
      case 'song-item-title':
      case 'song-item-duration':
          return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
      case 'song-item-number':
          return element;
      default:
          return;
  }  
};

 var clickHandler = function(targetElement) {
   var songItem = getSongItem(targetElement);
   if (currentlyPlayingSong === null) {
       songItem.innerHTML = pauseButtonTemplate;
       currentlyPlayingSong = songItem.getAttribute('data-song-number');
   } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
       songItem.innerHTML = playButtonTemplate;
       currentlyPlayingSong = null;
   } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
       var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
       currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
       songItem.innerHTML = pauseButtonTemplate;
       currentlyPlayingSong = songItem.getAttribute('data-song-number');
   }
 };

// elements to which we'll be adding listeners
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"</span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// store state of playing songs 
var currentlyPlayingSong = null;

window.onload = function(){
	setCurrentAlbum(albumPicasso);

	songListContainer.addEventListener('mouseover', function(event){
		
		if(event.target.parentElement.className === 'album-view-song-item') {
			event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;

			var songItem = getSongItem(event.target);

      if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
          songItem.innerHTML = playButtonTemplate;
      }
		}	

		for(i = 0; i < songRows.length; i++) {
			songRows[i].addEventListener('mouseleave', function(event){
				var songItem = getSongItem(event.target);
				var songItemNumber = songItem.getAttribute('data-song-number');

				if (songItemNumber !== currentlyPlayingSong) {
					songItem.innerHTML = songItemNumber;
				}
			});

			songRows[i].addEventListener('click', function(event){
				clickHandler(event.target);
			});
		}

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
}