function hideMenu(modal, playlistModal, isActive) {
    console.log(isActive);
    if (isActive === true) {
        console.log(modal)
        modal.style.display = "none";
    }
}

function handlePlaylistContextMenu(playlistData, playlistId, playlistElement) {
    
    playlistModal = document.getElementById("playlist-modal");
    deleteButton = document.getElementsByName("delete-playlist-btn")[0];
    
    createContextMenu(playlistElement, playlistModal);
    hideContextMenu(playlistModal, playlistElement)

    deleteButton.addEventListener("click", function(){
        deletePlaylist(playlist, playlistId, playlistElement);
    });
}


function handleContainerContextMenu(playlistModal, playlistElement) {
    sectionWrapper = document.getElementsByClassName("section-wrapper")[0];
    playlistButton = document.getElementsByName("create-playlist-btn")[0];
    modal = document.getElementById("modal");
    
    createContextMenu(sectionWrapper, modal)

    playlistButton.addEventListener("click", function () {
        handleCreateClick(playlists);
        modal.style.display = "none";
        localStorage.setItem("playlists", JSON.stringify(playlists));
        console.log(playlists)

    });

    modal.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        hideContextMenu(playlistModal, playlistElement)
        clickCounter++;
    });

    hideContextMenu(modal, sectionWrapper)
}


function createContextMenu(wrapper, contextmenu){
    wrapper.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        contextmenu.style.display = "flex";
        contextmenu.style.top = event.clientY + "px";
        contextmenu.style.left = event.clientX + "px";
        clickCounter = 0; 
    });
}

function hideContextMenu(contextMenu, wrapper){
    document.addEventListener("click", function (event) {
        if (event.target !== contextMenu && event.target !== wrapper) {
            contextMenu.style.display = "none";
        }
    });
}