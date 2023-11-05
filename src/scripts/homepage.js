function createPlaylistHtml(playlist){
    const wrapper = document.getElementById("home-head-cnt");
    const playlistElement = document.createElement("article");
    const mainContent = document.getElementById("main-content");

    playlistElement.innerHTML = `
    <div class="hmp-p-img-cnt">

    </div>
    <div>
        <span>${playlist.name}</span>
        <div class="play-icon" style="display: ${"none"};">
            <i class="fa-solid fa-play"></i>
        </div>
    </div>
    `
    const collage = createImage(songs)
    const imageContainer = playlistElement.querySelector(".hmp-p-img-cnt")
   
    if (playlist.id !== "L2I37"){
        imageContainer.appendChild(collage)
    }
    else if (playlist.id === "L2I37"){
        imageContainer.innerHTML = `<img src="${playlist.image_url}">`
    }
    
    wrapper.appendChild(playlistElement)
    playlistElement.dataset.id = playlist.id;

    playlistElement.addEventListener("click", () => {
        console.log(playlistElement.dataset.id)
        showPlaylistView(mainContent, playlist, "playlist")
    })

    playlistElement.addEventListener("mouseenter", () => {
        playlistElement.querySelector(".play-icon").style.display = "flex";
    });
    
    playlistElement.addEventListener("mouseleave", () => {
        playlistElement.querySelector(".play-icon").style.display = "none";
    });
}

function createHomePlaylists(index, list){
    const playlist = {
        id : generateUniqueId(),
        name: "My Playlist #" + index,
        description: "Playlist",
        user: "Alex",
        image_url: "/assets/images/covers/likedCover.png",
        songs: []
    }
    index++;

    list.push(playlist)
}

function createGenreHtml(genre, genresCnt){
    const genreElement = document.createElement("article");
    const mainContent = document.getElementById("main-content");

    genreElement.className = "genre";
    
    genreElement.innerHTML = `
        <span>${genre}</span>
    `
    const color = randomColor();
    const { r, g, b } = color; 
    genreElement.style.backgroundColor = `rgb(${r}, ${g}, ${b}, 0.5)`;

    genresCnt.appendChild(genreElement)

    genreElement.addEventListener("click", () => {
        console.log(genre)
        showPlaylistView(mainContent, genre, "genre")
    })
}


function createAlbums() {
    const albumList = songs.map(song => song.album);
    const uniqueAlbums = [...new Set(albumList)];

    const albumsWithSongs = uniqueAlbums.map(albumName => {
        const songsInAlbum = songs.filter(song => song.album === albumName);
        return {
            id: generateUniqueId(),
            name: albumName,
            songs: songsInAlbum,
            autor: songsInAlbum.length > 0 ? songsInAlbum[0].artists.join(', ') : 'Unknown Artist'
        };
    });

    return albumsWithSongs;
}


function createAlbumHtml(album, wrapper){
    const albumElement = document.createElement("article");
    const albumCover = createImage(album.songs) 
    const mainContent = document.getElementById("main-content");

    albumElement.className = "album";
    albumElement.innerHTML = `
        <div class="album-icon">
            
        </div>
        <div>
        <div class="album-title">
            <span>${album.name}</span>
        </div>
        <div class="album-description">
            <span>${album.autor}</span>
        </div>
        </div>

    `;
    const playlistIconCtn = albumElement.querySelector(".album-icon");
    playlistIconCtn.appendChild(albumCover);

    wrapper.appendChild(albumElement)

    albumElement.dataset.id = album.id;

    albumElement.addEventListener("click", () => {
        console.log(albumElement.dataset.id)
        showPlaylistView(mainContent, album, "playlist")
    })


}