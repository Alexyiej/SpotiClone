function generateUniqueId(){
    return Math.random().toString(36).substr(2, 9);
}

function handleCreateClick(playlists, songs) {
    playlist = {
        id: generateUniqueId(),
        name: "My Playlist #" + playListIndex,
        description: "Playlist",
        user: "Alex",
        image_url: "",
        songs: []
    }


    playlists.push(playlist);
    createPlaylists(playlist)
    playListIndex++;
    playlist.songs = songs
    console.log(playlist.songs[1].image_url)
    localStorage.setItem("playlists-index", playListIndex)

}

function deletePlaylist(playlistToRemove) {
    playlists = playlists.filter(playlist => playlist.id !== playlistToRemove.id);
    
    const playlistsWrapper = document.querySelector(".playlists-wrapper");
    playlistsWrapper.innerHTML = "";

    localStorage.setItem("playlists", JSON.stringify(playlists));
    const index = localStorage.getItem("playlists-index");

    if (playlists.length === 0) {
        localStorage.setItem("playlists-index", 0);
    }
    else if (index > 0) {
        localStorage.setItem("playlists-index", index - 1);
    }
    
    loadPlaylists();
    
}

function createPlaylists(playlist) {
    
    const playlistsWrapper = document.querySelector(".playlists-wrapper");
    const playlistElement = document.createElement("article");
    const view = document.getElementById("main-content");

    playlistElement.dataset.id = playlist.id;

    playlistElement.className = "playlist";
    playlistElement.innerHTML = `
        <div class="wrapper">
            <div class="playlist-icon">
                <img src="/src/assets/images/playlists/playlist-icon-basic.png" alt="/src/assets/images/playlists/playlist-icon-basic.png">
            </div>
            <div class="playlist-title">
                <span>${playlist.name}</span>
            </div>
            <div class="playlist-description">
                <span>${playlist.description}</span>
                <span>${playlist.user}</span>
            </div>
        </div>
    `;

    playlistElement.addEventListener("mousedown", function(event) {
        if(event.button === 2) {
            event.preventDefault();
            handlePlaylistContextMenu(playlist, playlistElement);
        }
        else if(event.button === 0){
            showPlaylistView(view, playlist)
        }
    });
    
    playlistsWrapper.appendChild(playlistElement);

}

