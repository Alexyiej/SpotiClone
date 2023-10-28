// playlists / container 
function handlePlaylistContextMenu(playlistWrapper) {
    const playlistModal = document.getElementById("playlist-modal");
    const deleteButton = document.getElementsByName(`delete-playlist-btn`)[0];

    playlistWrapper.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        const playlistElement = event.target.closest(".playlist");
        let playlist = playlists.find(playlist => playlist.id === playlistElement.dataset.id);

        if (playlist.id !== "L2I37"){
            createContextMenu(playlistElement, playlistModal, event);
            hideContextMenu(playlistModal, playlistElement);
            
            deleteButton.dataset.id = playlist.id;
        }

    });

    deleteButton.addEventListener("click", function() {
        deletePlaylist(this.dataset.id); 
    });

}

function handleContainerContextMenu(playlistModal, playlistElement, songs) {
    playlistButton = document.getElementsByName("create-playlist-btn")[0];
    modal = document.getElementById("modal");
    sectionWrapper = document.getElementsByClassName("section-wrapper")[0];
    
    sectionWrapper.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        createContextMenu(sectionWrapper, modal, event)
    });

    playlistButton.addEventListener("click", function () {
        handleCreateClick(playlists, songs);
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

function handleEditMenu(playlist) {
    const editModal = document.getElementById("playlist-edit-box");
    const editBtn = document.getElementById("edit-btn");
    const scndBtn = document.getElementById("edit-btnNd");
    const wrapper = document.getElementById("page-tint");
    const saveBtn = document.getElementById("save-btn");
    
    console.log(playlist.id)

    editBtn.addEventListener("click", function(event) {
        event.preventDefault();
        editModal.style.display = "flex";
        wrapper.style.display = "flex";

        event.stopPropagation(); 
    });
    
    scndBtn.addEventListener("click", function(event) {
        event.preventDefault();
        editModal.style.display = "flex";
        wrapper.style.display = "flex";

        event.stopPropagation(); 
    });


    saveBtn.addEventListener("click", function(event) {
        handleEdit(playlist, editModal, wrapper); 
    });


}

function handleEvent(element, modal, wrapper){
    const closeIcon = document.getElementById("close-icon");
    element.addEventListener("click", function(event) {
        event.preventDefault();

        modal.style.display = "flex";
        wrapper.style.display = "flex";

        event.stopPropagation(); 
    });
    hideEditMenu(wrapper, modal, closeIcon)
    
}

function hideEditMenu(wrapper, editModal, closeIcon){
    wrapper.addEventListener("click", function(event) {
        if (event.target !== editModal) {
            editModal.style.display = "none";
            wrapper.style.display = "none";
        }
    });

    closeIcon.addEventListener("click", function(event) {
        event.preventDefault();
        editModal.style.display = "none";
        wrapper.style.display = "none";
    });

}

// create / hide
function createContextMenu(wrapper, contextmenu, event){
    contextmenu.style.display = "flex";
    contextmenu.style.top = event.clientY + "px";
    contextmenu.style.left = event.clientX + "px";
    clickCounter = 0; 
}

function hideContextMenu(contextMenu, wrapper){
    document.addEventListener("click", function (event) {
        if (event.target !== contextMenu && event.target !== wrapper) {
            contextMenu.style.display = "none";
        }
    });
}


function handleSongContextMenu(event, song, playlistId){
    const contextMenu = document.getElementById("song-modal");
    const wrapper = document.getElementById("main-content");
    createContextMenu(wrapper, contextMenu, event)

    const addToPlaylistBtn = document.getElementById("add-to-playlist-btn");
    const removeBtn = document.getElementById("remove-from-playlist-btn");
    
    addToPlaylistBtn.addEventListener("click", function(event) {
        addToPlaylist(song, "69btk8m5w")
        hideContextMenu(contextMenu, wrapper)
    });

    removeBtn.addEventListener("click", function(event) {
        removeSong(playlistId, song)
        hideContextMenu(contextMenu, wrapper)
    });

    hideContextMenu(contextMenu, wrapper)

}