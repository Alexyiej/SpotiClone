function generateUniqueId(){
    return Math.random().toString(36).substr(2, 9);
}
function handleCreateClick(playlists, songs) {
    playlist = {
        id: generateUniqueId(),
        name: "My Playlist #" + playListIndex,
        description: "Playlist " + playListIndex,
        user: "Alex",
        image_url: "/src/assets/images/playlists/playlist-icon-basic.png",
        songs: []
    }


    playlists.push(playlist);
    createPlaylists(playlist, playlist.id)
    playListIndex++;
    
    playlist.songs = songs
    console.log(playlist)
    localStorage.setItem("playlists-index", playListIndex)

}

function deletePlaylist(playlist, playlistId, playlistElement) {
    playlistElement.style.display = "none"
    console.log(playlist)
    playlists = playlists.filter(function (item) {
        return item.id !== playlistElement.dataset.id;
    });
    localStorage.setItem("playlists", JSON.stringify(playlists));
}



function createPlaylists(playlist, playlistId) {
    const playlistsWrapper = document.querySelector(".playlists-wrapper");
    const playlistElement = document.createElement("article");
    const view = document.getElementById("playlist-view");

    playlistElement.className = "playlist";
    playlistElement.innerHTML = `
        <div class="wrapper">
            <div class="playlist-icon">
                <img src="${playlist.image_url}" alt="Likedsongs">
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
            handlePlaylistContextMenu(playlist, playlistId, playlistElement);
        }
        else if(event.button === 0){
            console.log("left click")
            changePage(view, "view", playlist)
        }
    });
    
    playlistElement.dataset.id = playlist.id;
    playlistsWrapper.appendChild(playlistElement);



}

