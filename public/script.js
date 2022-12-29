var artistFormEl = document.querySelector('#artist-form')
var findArtistEl = document.querySelector('#find-artist');
var fetchButton = document.querySelector('#submit-button');
var groupNameEl = document.getElementById('group-name');
var albumListEl = document.querySelector('#album-list');
var artistIdNumber = '';

var refreshPage = document.querySelector('#refresh-btn');
var artistStudioAlbums = [];
var artistCompAlbums = [];

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
                    'https://musicbrainz.org/ws/2/artist/' + artistIdNumber + '?fmt=json&limit=40&inc=release-groups';

                fetch(albumRequestUrl)
                    .then((response) => response.json())
                    .then(function (data) {
                        // console.log(data['release-groups'][0].title);

                        // HOW CAN I GRAB TITLE DATA FROM RELEASE-GROUPS???
                        // ANSWER -- use ['-']
                        for (var i = 0; i < data['release-groups'].length; i++) {
                            // var artistAlbumsId = data['release-groups'][i].id;
                            // var artistAlbumsYear = [data['release-groups'][i]['first-release-date'].slice(0, 4)];

                            if (data['release-groups'][i]['secondary-types'][0] === 'Compilation') {
                                var artistCompAlbumsList = 'Compilation album ' + data['release-groups'][i].title + ' was released in ' + data['release-groups'][i]['first-release-date'].slice(0, 4);
                                artistCompAlbums.push(artistCompAlbumsList);
                            } else if (data['release-groups'][i]['secondary-types'][0] === 'Soundtrack') {
                                var artistSoundtrackAlbums = 'Soundtrack album ' + data['release-groups'][i].title;
                                // console.log(artistSoundtrackAlbums);
                            } else if (data['release-groups'][i]['secondary-types'][0] === 'Live') {
                                var artistLiveAlbums = 'Live album ' + data['release-groups'][i].title;
                                // console.log(artistLiveAlbums);
                            } else if (data['release-groups'][i]['secondary-types'][0] === 'Compilation' || (data['release-groups'][i]['secondary-types'][0] === 'Live')) {
                                var artistLiveCompAlbums = 'Live compilation album ' +  data['release-groups'][i].title + ' was released in ' + data['release-groups'][i]['first-release-date'].slice(0, 4);
                                // console.log(artistLiveCompAlbums);
                            } else {
                                (data['release-groups'][i]['secondary-types'] === '')
                                var artistStudioAlbumsList = 'Studio album ' + data['release-groups'][i].title + ' was released in ' + data['release-groups'][i]['first-release-date'].slice(0, 4);
                                artistStudioAlbums.push(artistStudioAlbumsList);
                            }

                            var artistAlbumList = document.createElement('ul');
                            artistAlbumList.textContent = artistStudioAlbums[i];
                            albumListEl.appendChild(artistAlbumList);
                            // console.log(artistAlbumsTitle, artistAlbumsYear, artistAlbumsId)
                        }

                        //     data.release-groups.forEach(function (element) {
                        //         if (element.status === 'Official' && element.packaging === 'Cardboard/Paper Sleeve' && element.primary-type === 'Album')
                        //         console.log(element);
                        //         console.log(element.id, element.first-release-date);

                        //         if (element.country == "US" && element.media[0].format === '12\" Vinyl')
                        //             console.log(element.id, element.media, element.date);
                        // })
                        // }
            })
        }
    })
};

// Refresh button for new search


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