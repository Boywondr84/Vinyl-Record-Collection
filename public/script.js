// FORMS
var artistFormEl = document.querySelector('#artist-form');
var albumFormEl = document.querySelector('#album-form');
var findArtistEl = document.querySelector('#find-artist');
var findAlbumEl = document.querySelector('#find-album');

// BUTTONS
var artistButton = document.querySelector('#submit-button');
var albumButton = document.querySelector('#album-submit');

var groupNameEl = document.getElementById('group-name');
var albumListEl = document.querySelector('#album-list');
var artistIdNumber = '';

var albums = [];
var artistStudioAlbums = [];
var artistCompAlbums = [];
var artistLiveAlbums = [];


// USING MusicBrainz
function getArtist(artist) {

    var res =
        // 'https://itunes.apple.com/search?term=166529&entity=album'
        'https://musicbrainz.org/ws/2/artist?fmt=json&query=' + artist + '&limit=1';
    fetch(res)
        .then((response) => response.json())
        .then(function (data) {
            for (var i = 0; i < data.artists.length; i++) {
                if (data.artists.name === artist && data.score === 100);
                console.log(artist + ' has a MusicBrainz ID of ' + data.artists[0].id);
                var artistIdNumber = data.artists[0].id;
                var listItem = document.createElement('h2');
                listItem.textContent = 'Albums recorded by ' + artist + ' are:';
                groupNameEl.appendChild(listItem);
                // console.log(data);

                getAlbums();
            }
            function getAlbums() {
                var albumRequestUrl =
                    // 'https://itunes.apple.com/lookup?id=' + artistIdNumber + '&entity=album&limit=15';
                    'https://musicbrainz.org/ws/2/artist/' + artistIdNumber + '?fmt=json&inc=release-groups&primary-type=album';
                // 'https://musicbrainz.org/ws/2/release-group/4e98c9b4-92f6-3049-b9da-a1088b623672?fmt=json';

                fetch(albumRequestUrl)
                    .then((response) => response.json())
                    .then(function (data) {

                        // console.log(data);
                        // HOW CAN I GRAB TITLE DATA FROM RELEASE-GROUPS???
                        // ANSWER -- use ['-']
                        for (var i = 0; i < data['release-groups'].length; i++) {

                            // console.log(data['release-groups']);

                            if (data['release-groups'][i]['secondary-types'][0] === 'Compilation') {
                                artistCompAlbums =
                                    [data['release-groups'][i].title + ' released in ' +
                                        data['release-groups'][i]['first-release-date'].slice(0, 4) + '. ID ' +
                                        data['release-groups'][i].id]

                                console.log(artistCompAlbums);

                            } else if (data['release-groups'][i]['secondary-types'][0] === 'Soundtrack') {
                                var artistSoundtrackAlbums = data['release-groups'][i].title + ' ' + data['release-groups'][i]['first-release-date'].slice(0, 4);
                                // console.log(artistSoundtrackAlbums);
                            } else if (data['release-groups'][i]['secondary-types'][0] === 'Live') {
                                var artistLiveAlbumsList = data['release-groups'][i].title + ' ' + data['release-groups'][i]['first-release-date'].slice(0, 4);
                                artistLiveAlbums.push(artistLiveAlbumsList);
                                // console.log(artistLiveAlbums)
                            } else if (data['release-groups'][i]['secondary-types'][0] === 'Compilation' || (data['release-groups'][i]['secondary-types'][0] === 'Live')) {
                                var artistLiveCompAlbums = data['release-groups'][i].title + ' ' + data['release-groups'][i]['first-release-date'].slice(0, 4);
                                // console.log(artistLiveCompAlbums);
                            } else {
                                //     var artistStudioAlbumsList = data['release-groups'][i].title + ' ' + data['release-groups'][i]['first-release-date'].slice(0, 4);
                                //     artistStudioAlbums.push(artistStudioAlbumsList);
                                //     console.log(artistStudioAlbums);
                            }
                            // var artistAlbumList = document.createElement('ul')

                            // var studioButtonEl = document.getElementById('studio-albums-btn');
                            // studioButtonEl.addEventListener('click', studioAlbumDisplay);

                            // function studioAlbumDisplay() {
                            // for (var i = 0; i < artistStudioAlbums.length; i++) {
                            //         console.log(artistStudioAlbums)
                            var albumsList = document.createElement('h4');
                            albumsList.textContent = artistCompAlbums;
                            // console.log(artistStudioAlbums.length)
                            albumListEl.appendChild(albumsList);
                            // console.log(albumsList);

                            //     data.release-groups.forEach(function (element) {
                            //         if (element.status === 'Official' && element.packaging === 'Cardboard/Paper Sleeve' && element.primary-type === 'Album')
                            //         console.log(element);
                            //         console.log(element.id, element.first-release-date);

                            //         if (element.country == "US" && element.media[0].format === '12\" Vinyl')
                            //             console.log(element.id, element.media, element.date);
                            // })
                        }
                    })
            }
        })
};

// ALBUM RELEASE INFO API REQUEST SEARCH
function getAlbumInfo(album) {
    var albumInfoRequest =
        'https://musicbrainz.org/ws/2/release-group/' + album + '?fmt=json&inc=releases';
    fetch(albumInfoRequest)
        .then((response) => response.json()
            .then(function (data) {
                console.log(data);
            })
        )
}




var formSubmitHandler = function (event) {
    event.preventDefault();
    // var artistName = findArtistEl.value;
    var artist = findArtistEl.value;
    // console.log(artistName);
    // getApi(artistName);
    getArtist(artist);
    findArtistEl.value = "";
}

artistFormEl.addEventListener('submit', formSubmitHandler);

var albumFormSubmitHandler = function (event) {
    event.preventDefault();
    var album = findAlbumEl.value;
    getAlbumInfo(album)
    findAlbumEl.value = "";
}

albumFormEl.addEventListener('submit', albumFormSubmitHandler);

