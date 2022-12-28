var artistFormEl = document.querySelector('#artist-form')
var findArtistEl = document.querySelector('#find-artist');
var fetchButton = document.querySelector('#submit-button');
var groupNameEl = document.getElementById('group-name');
var albumListEl = document.querySelector('#album-list');
var artistIdNumber = '';


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

                function getAlbums() {
                    var albumRequestUrl =
                        // 'https://itunes.apple.com/lookup?id=' + artistIdNumber + '&entity=album&limit=15';
                        'https://musicbrainz.org/ws/2/artist/' + artistIdNumber + '?fmt=json&inc=release-groups';

                    fetch(albumRequestUrl)
                        .then((response) => response.json())
                        .then(function (data) {
                            // console.log(data['release-groups'][0].title);

                            // HOW CAN I GRAB TITLE DATA FROM RELEASE-GROUPS???
                            // ANSWER -- use ['-']
                            for (var i = 0; i < data['release-groups'].length; i++) {
                                if (data['release-groups'][i]['primary-type'] === 'Album');
                                var artistAlbumsTitle = data['release-groups'][i].title;
                                var artistAlbumsId = data['release-groups'][i].id;
                                var artistAlbumsYear = data['release-groups'][i]['first-release-date'].slice(0, 4);

                                var artistAlbumList = document.createElement('ul');
                                artistAlbumList.textContent = artistAlbumsTitle + ' released in  ' + artistAlbumsYear;
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


                            // for (var i = 1; i < data.results.length; i++) {
                            //     var artistAlbums = data.results[i].collectionName;
                            //     // var artistAlbumsArtwork = data.results[i].artworkUrl100;
                            //     console.log(artistAlbums);
                            //     // console.log(artistAlbumsArtwork);
                        })
                }
            }
        })
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