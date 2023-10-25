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

    let currentView = "home"
    headerColor(currentView)
}

function showPlaylistView(mainContent, playlist) {
    const playlistLenght = playlist.songs.length;
    const playlistDuration = ((playlist.songs.reduce((acc, song) => acc + song.duration, 0)) / 60 ).toFixed(2);

    mainContent.innerHTML = `
    <article id="playlist-view">
    <container class="wrapper">
        <section>
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
        <container id="songs-container">
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
            <div id="songs-wrapper">
                
            </div>
        </container>
    </container>
</article>
    `;

    localStorage.setItem("current-view", JSON.stringify({ name: "playlist", view: playlist }));
    let currentView = "playlist"
    //headerColor(currentView)

    const btn = document.getElementById("edit-btn");
    const modal = document.getElementById("playlist-edit-box");
    const wrapper = document.getElementById("page-tint");
    handleEvent(btn, modal, wrapper)

    for (song of playlist.songs) {
        addSong(song)
    }

}

