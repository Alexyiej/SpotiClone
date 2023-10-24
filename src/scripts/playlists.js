function generateUniqueId(){
    return Math.random().toString(36).substr(2, 9);
}

function handleCreateClick(playlists, songs) {
    playlist = {
        id: generateUniqueId(),
        name: "My Playlist #" + playListIndex,
        description: "Playlist",
        user: "Alex",
        image_url: "/src/assets/images/covers/basic-cover.png",
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

    playlistElement.dataset.id = playlist.id;
    playlistElement.className = "playlist";

    playlistElement.innerHTML = `
        <div class="wrapper">
            <div class="playlist-icon">
                <img src="${playlist.image_url}" alt="/src/assets/images/covers/basic-cover.png">
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

    playlistsWrapper.appendChild(playlistElement);

}

function handleEdit(id) {
    const playlistToChange = playlists.find(playlist => playlist.id === id);
    console.log(playlistToChange)
}

const playlistsWrapper = document.querySelector(".playlists-wrapper");
const view = document.getElementById("main-content");

playlistsWrapper.addEventListener("click", function(event) {
    const playlistElement = event.target.closest(".playlist");
    if (playlistElement) {
        const playlist = playlists.find(playlist => playlist.id === playlistElement.dataset.id);
        showPlaylistView(view, playlist)
    }
});