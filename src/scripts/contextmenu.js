// playlists / container 
function handlePlaylistContextMenu(playlist, playlistElement) {
    playlistModal = document.getElementById("playlist-modal");
    deleteButton = document.getElementsByName("delete-playlist-btn")[0];
    
    createContextMenu(playlistElement, playlistModal);
    hideContextMenu(playlistModal, playlistElement)

    deleteButton.addEventListener("click", function(){
        deletePlaylist(playlist); 
    });
}

function handleContainerContextMenu(playlistModal, playlistElement, songs) {
    sectionWrapper = document.getElementsByClassName("section-wrapper")[0];
    playlistButton = document.getElementsByName("create-playlist-btn")[0];
    modal = document.getElementById("modal");
    
    createContextMenu(sectionWrapper, modal)

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