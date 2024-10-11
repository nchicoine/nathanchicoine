class Album {
    constructor(title, artist, year, songs, runtime, genre, rating, fav) {
    this.title = title;
    this.artist = artist;
    this.year = year;
    this.songs = songs;
    this.runtime = runtime;
    this.genre = genre;
    this.rating = rating;
    this.fav = fav;
    }
}

fetch('data/album_data.csv')
    .then(response => response.text())
    .then(data=> {
        Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                console.log(results.data)
                const albums = results.data.map(record => new Album(
                    record.title,
                    record.artist,
                    record.year,
                    record.songs,
                    record.runtime,
                    record.genre,
                    record.rating,
                    record.fav
                ));
                console.log(albums);
                displayAlbums(albums); 
            }
        })
    })

function displayAlbums(albums) {
    const container = document.getElementById("content-container");
    albums.forEach(album => {
        const albumDiv = document.createElement("div");
        let cover = album.title.split(' ').join('_');
        albumDiv.className = "album-section";
        albumDiv.innerHTML = `
            <div class="album-col" id="album-col-1">
                <img class="album-img" src="images/${cover}.jpg" alt="${album.title} cover art">
                <ul class="album-ul">
                    <li>${album.artist}</li>
                    <li>${album.year}</li>
                </ul>
                <ul class="album-ul">
                    <li>${album.songs} songs</li>
                    <li>${album.runtime} minutes</li>
                </ul>
                <ul class="album-ul">
                    <li>${album.genre}</li>
                    <li>album.label</li>
                </ul>
            </div>
            <div class="album-col" id="album-col-2">
                <h2>${album.title}</h2>
                <h3>${album.rating}/10</h3>
                <h4>Favourite Song : ${album.fav}</h3>
                <p>album.review</p>
            </div>
            `;
        container.appendChild(albumDiv);
    });
}   