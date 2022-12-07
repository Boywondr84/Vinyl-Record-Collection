var artistFormEl = document.querySelector('#artist-form')
var findArtistEl = document.querySelector('#find-artist');
var fetchButton = document.querySelector('#submit-button');
var groupNameEl = document.getElementById('group-name');
var albumImageEl = document.querySelector('#album-image');
var artistIdNumber = '';

// var res = fetch('https://itunes.apple.com/search?term=166529&entity=album')
//     // 'https://musicbrainz.org/ws/2/release/42e47930-3707-347c-9f1a-0e04e0bc5355')
// .then((response) => response.json())
// .then((data) => console.log(data));



function getApi(artistName) {

    var requestUrl = 'https://itunes.apple.com/search?term=' + artistName + '&entity=album';
    // 'https://musicbrainz.org/ws/2/artist?fmt=json&query=' '&limit=2';
    fetch(requestUrl)
        .then((response) => response.json())
        .then(function (data) {
            // console.log(data)
            
            for (var i = 0; i < data.results.length; i++) {
                var filteredArtistName = data.results.filter(function (element) {
                    if (element.artistName != artistName) {
                        var errorArtistName = document.createElement('p');
                        errorArtistName.textContent = "Check spelling and make sure the first letter(s) are capitalized"
                        groupNameEl.appendChild(errorArtistName);
                    }
                    return (element.artistName === artistName);
                    
                });
                
                console.log(filteredArtistName);
                console.log(filteredArtistName[0].artistName + ' has an ID number of ' + filteredArtistName[0].artistId);


                // after finding artistId, use this id to filter out albums.
                // var artistIdNumbers = [data.results[i].artistId];
                // console.log(artistIdNumbers);
                // const filteredArtistIdNumbers = artistIdNumbers.filter(function (data) {
                    // return data === 166529;
                // });
                // console.log(filteredArtistIdNumbers);
            }

            // console.log(data.results[0].artistName + ' has an ID of ')
            // console.log('Album: ' + data.results[2].collectionName + ' has an ID of ' + data.results[2].collectionId)
            
            // var artistIdNum = data.results[0].artistId;
            // getAlbums();
            var listItem = document.createElement('li');
            listItem.textContent = artistName + ' has an ID number of ' + filteredArtistName[0].artistId;
            groupNameEl.appendChild(listItem);
            // var albumCover = document.createElement('div');
            // albumCover.textContent = filteredArtistName[0].artworkUrl100;
            // albumImageEl.appendChild(albumCover);
        })
}
// function getAlbums(artistIdNum) {
//     var albumRequestUrl = 'https://itunes.apple.com/us/artist' + artistName + artistIdNum + '/see-all?section=full-albums';
//         fetch(albumRequestUrl)
//         .then((response) => response.json())
//         .then(function (data) {
//             console.log(data);
//         })
// }

var formSubmitHandler = function (event) {
    event.preventDefault();
    var artistName = findArtistEl.value;
    // console.log(artistName);
    getApi(artistName);
    findArtistEl.value = "";
}

artistFormEl.addEventListener('submit', formSubmitHandler);
