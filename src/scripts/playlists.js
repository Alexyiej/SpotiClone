function generateUniqueId(){
    return Math.random().toString(36).substr(2, 9);
}

function handleCreateClick(playlists) {
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
    const modal = document.getElementById("modal");
    const sectionWrapper = document.getElementsByClassName("section-wrapper")[0];
    const playlistModal = document.getElementById("playlist-modal");
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

    let isActive = false;

    playlistElement.addEventListener("mousedown", function(event) {
        if(event.button === 2) {
            event.preventDefault();
            handlePlaylistContextMenu(playlist, playlistId, playlistElement);
            isActive = true;
            hideMenu(modal, playlistModal, isActive);
        }
        else if(event.button === 0){
            console.log("left click")
        }
    });
    
    playlistElement.dataset.id = playlist.id;
    playlistsWrapper.appendChild(playlistElement);

}

