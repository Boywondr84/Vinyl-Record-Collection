var artistFormEl = document.querySelector('#artist-form')
var findArtistEl = document.querySelector('#find-artist');
var fetchButton = document.querySelector('#submit-button');
var groupNameEl = document.getElementById('group-name');
var albumListEl = document.querySelector('#album-list');
var artistIdNumber = '';

// var res = fetch('https://itunes.apple.com/search?term=166529&entity=album')
//     // 'https://musicbrainz.org/ws/2/release/42e47930-3707-347c-9f1a-0e04e0bc5355')
// .then((response) => response.json())
// .then((data) => console.log(data));



function getApi(artistName) {

    var requestUrl = 'https://itunes.apple.com/search?term=' + artistName;
    // + '&entity=album&limit=1';
    // 'https://musicbrainz.org/ws/2/artist?fmt=json&query=' '&limit=2';
    fetch(requestUrl)
        .then((response) => response.json())
        .then(function (data) {
            // console.log(data)

            for (var i = 0; i < data.results.length; i++) {
                var filteredArtistName = data.results.filter(function (element) {
                    return (element.artistName === artistName);
                });
                // find albums using artist ID
            }
            var artistIdNumber = filteredArtistName[0].artistId;
            var listItem = document.createElement('li');
            listItem.textContent = artistName + ' has an ID number of ' + artistIdNumber;
            groupNameEl.appendChild(listItem);
            getAlbums();
            // var albumListItem = document.createElement('li');
            // albumListItem.textContent = 

            function getAlbums() {
                var albumRequestUrl = 'https://itunes.apple.com/lookup?id=' + artistIdNumber + '&entity=album&limit=10';

                fetch(albumRequestUrl)
                    .then((response) => response.json())
                    .then(function (data) {
                        console.log(data);
                    })
            }
        });
}

var formSubmitHandler = function (event) {
    event.preventDefault();
    var artistName = findArtistEl.value;
    // console.log(artistName);
    getApi(artistName);
    findArtistEl.value = "";
}

artistFormEl.addEventListener('submit', formSubmitHandler);
