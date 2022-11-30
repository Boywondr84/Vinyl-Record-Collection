var fetchButton = document.getElementById('fetch-button');
var groupNameEl = document.getElementById('group-name');

function getApi() {

    var requestUrl = 'https://musicbrainz.org/ws/2/artist?fmt=json&query=pink+floyd&limit=2';
    fetch(requestUrl)
        .then((response) => response.json())
        .then(function(data) {
                console.log(data.artists[0].name, data.artists[0].id)
                var listItem = document.createElement('li');
                listItem.textContent = data.artists[0].name;
                groupNameEl.appendChild(listItem);
            })
        }

fetchButton.addEventListener('click', getApi);
