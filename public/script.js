var artistFormEl = document.querySelector('#artist-form')
var findArtistEl = document.querySelector('#find-artist');
var fetchButton = document.querySelector('#submit-button');
var groupNameEl = document.getElementById('group-name');


function getApi(artistName) {

    var requestUrl = 'https://musicbrainz.org/ws/2/artist?fmt=json&query=' + artistName +'&limit=2';
    fetch(requestUrl)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data.artists[0].name, data.artists[0].id)
            var listItem = document.createElement('li');
            listItem.textContent = data.artists[0].name;
            groupNameEl.appendChild(listItem);
        })
}

var formSubmitHandler = function (event) {
    event.preventDefault();
    var artistName = findArtistEl.value;
    // console.log(artistName);
    getApi(artistName);
    findArtistEl.value = "";
}

artistFormEl.addEventListener('submit', formSubmitHandler);
