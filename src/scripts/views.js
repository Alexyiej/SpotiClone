function showHomeView(mainContent){
    mainContent.innerHTML = `

    <section id="home">
        <container>
            <section>
            <div class="title">
                <span>Good afternoon</span>
            </div>
            <container class="playlists" id="home-head-cnt">
                
            </container>
        </section>

        <section class="home-section">
            <div class="title">
                <span>Episodes for you</span>
            </div>
            <container id="albums">
                
            </container>
        </section>

        <section class="home-section">
            <div class="title">
                <span>Browse all</span>
            </div>
            <container id="all-genres-cnt">

            </container>
        </section>

    </container>
</section>
    `;

    localStorage.setItem("current-view", JSON.stringify({ name: "home" }));

    const wrapper = document.getElementById("main-page-bg");
    whiteBg(wrapper, "hide")
    let homePlaylists = playlists.slice(0, 6)
    const genresCnt = document.getElementById("all-genres-cnt");
    const albumsCtn = document.getElementById("albums");

    for (playlist of homePlaylists){
        createPlaylistHtml(playlist)
    }

    for (genre of genres){
        createGenreHtml(genre, genresCnt)
    }

    let albums = createAlbums()
    for (album of albums){
        createAlbumHtml(album, albumsCtn)
    }
}

function showPlaylistView(mainContent, playlist) {
    if (playlist.songs){ var playlistLenght = playlist.songs.length; }
    if (playlist.songs){ var playlistDuration = ((playlist.songs.reduce((acc, song) => acc + song.duration, 0)) / 60 ).toFixed(2); }

    mainContent.innerHTML = `
    <article id="playlist-view">
    <container class="wrapper">
        <section id="section-id">
            <div class="playlist-info">
                <div class="playlist-icon" id="edit-btnNd">
                    <img src="${playlist.image_url}" >
                </div>
                <div class="info">
                    <span>
                        <p>Private Playlist</p>
                        <h1 id="edit-btn">${playlist.name}</h1>
                    </span>
                    <span>alex ${playlistLenght} songs, <p>${playlistDuration}</p></span>
                </div>
                
            </div>
        </section>
        <div class="show-more">
            <div>
                <div>
                    <i class="fa-solid fa-play"></i>
                </div>
                <span>...</span>
            </div>

            <div>
                <i class="fa-solid fa-magnifying-glass"></i>
                <button>
                    <span>Custom Order <i class="fa-solid fa-caret-down"></i></span>
                    <div class="filters-dropdown"></div>
                </button>
            </div>

        </div>
        <div id="sticky-desc">
                <div class="songs-title">
                    <div>
                        <span>#</span>
                        <span>Title</span>
                    </div>
                    <div>
                        <span>Album</span>
                        <span>Date added</span>
                        <span><i class="fa-regular fa-clock"></i></span>
                    </div>
                </div>
            </div>
        <container id="songs-container">
            
            <div id="songs-wrapper">
                
            </div>
        </container>
        <container class="playlist-footer">
        
        </container>

    </container>
</article>
    `;

    localStorage.setItem("current-view", JSON.stringify({ name: "playlist", view: playlist }));

    const btn = document.getElementById("edit-btn");
    const modal = document.getElementById("playlist-edit-box");
    const tint = document.getElementById("page-tint");
    const wrapper = document.getElementById("main-page-bg");
    
    whiteBg(wrapper, "show")
    handleEvent(btn, modal, tint)
    if (playlist.id === "L2I37"){
        playlist.songs = getLiked()
        createHtmlSongs(mapLists(playlist.songs))
    } else{
        //createHtmlSongs(mapLists(likedSongs, songs))
        createHtmlSongs(mapLists(playlist.songs))
    }
    
    handleScroll()
    handleFavSongs(playlist.id)
    
}



function whiteBg(wrapper, state){
    if (state === "hide") {
        wrapper.style.display = "none";
    } else if (state === "show"){
        wrapper.style.display = "flex";
    }
}


function createImage(songs){
    const imageElement = document.createElement("div");
    imageElement.className = "kolaz";
    function getRandomIndex(maxIndex) {
        return Math.floor(Math.random() * (maxIndex + 1));
    }

    // Losowo wybieramy 4 obrazy z listy
    const selectedImages = [];
    const totalImages = songs.length;
    while (selectedImages.length < 4 && selectedImages.length < totalImages) {
        const randomIndex = getRandomIndex(totalImages - 1);
        const selectedImage = songs[randomIndex].coverUrl;
        // Sprawdzamy, czy obrazek nie został już wybrany
        if (!selectedImages.includes(selectedImage)) {
            selectedImages.push(selectedImage);
        }
    }

    const [first, second, third, fourth] = selectedImages
    imageElement.innerHTML = `
        <div>
            <img src="${first}">
        </div>
        <div>
            <img src="${second}">
        </div>
        <div>
            <img src="${third}">
        </div>
        <div>
            <img src="${fourth}">
        </div>
    
        `

    return imageElement
}