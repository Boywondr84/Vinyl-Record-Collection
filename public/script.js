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
                data.artists.filter(function (element) {
                    if (element.name === artist && element.score === 100);
                    console.log(element.name + ' has an ID of ' + element.id);

                    // var artistIdNumber = filteredArtistName[0].id;
                    // var listItem = document.createElement('li');
                    // listItem.textContent = artist + ' has an ID number of ' + artistIdNumber;
                    // groupNameEl.appendChild(listItem);
                    getAlbums();

                    function getAlbums() {
                        var albumRequestUrl =
                            // 'https://itunes.apple.com/lookup?id=' + artistIdNumber + '&entity=album&limit=15';
                            'https://musicbrainz.org/ws/2/release?fmt=json&query=' + artist + '&limit=15';

                        fetch(albumRequestUrl)
                            .then((response) => response.json())
                            .then(function (data) {
                                for (var i = 0; i < data.releases.length; i <= 25) {
                                    data.releases.filter(function (element) {
                                        if (element.status === 'Official' && element.country === 'US')
                                            console.log(element.id, element.media[0].format, element.date);
                                    })
                                }


                                // for (var i = 1; i < data.results.length; i++) {
                                //     var artistAlbums = data.results[i].collectionName;
                                //     // var artistAlbumsArtwork = data.results[i].artworkUrl100;
                                //     console.log(artistAlbums);
                                //     // console.log(artistAlbumsArtwork);

                                //     var artistAlbumList = document.createElement('ul');
                                //     artistAlbumList.textContent = artistAlbums;
                                //     albumListEl.appendChild(artistAlbumList);

                            })
                    }
                });
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