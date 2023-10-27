function showHomeView(mainContent) {
    mainContent.innerHTML = `
        <section id="home">
            <div class="title">
                <span>home</span>
            </div>
            <container class="playlists-container">
                <!-- Home -->
            </container>
        </section>
    `;

    localStorage.setItem("current-view", JSON.stringify({ name: "home" }));

    const wrapper = document.getElementById("main-page-bg");
    whiteBg(wrapper, "hide")
    
}

function showPlaylistView(mainContent, playlist) {
    const playlistLenght = playlist.songs.length;
    const playlistDuration = ((playlist.songs.reduce((acc, song) => acc + song.duration, 0)) / 60 ).toFixed(2);

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
    addSongs(playlist.songs)
    handleScroll()
}



function whiteBg(wrapper, state){
    if (state === "hide") {
        wrapper.style.display = "none";
    } else if (state === "show"){
        wrapper.style.display = "flex";
    }
}