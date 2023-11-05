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

function handleEditMenu(element, modal, wrapper, playlistObject) {
    const saveBtn = document.getElementById("save-btn");
    const closeIcon = document.getElementById("close-icon");

    function openMenu(event) {
        event.preventDefault();
        event.stopPropagation();

        modal.style.display = "flex";
        wrapper.style.display = "flex";

        saveBtn.addEventListener("click", saveChanges);
        hideEditMenu(wrapper, modal, closeIcon);
    }

    function saveChanges(event) {
        event.preventDefault();
        event.stopPropagation();

        const input = document.getElementById("playlistInput");
        const newName = input.value
        input.value = "";

        const playlistToEdit = playlists.find(playlist => playlist.id === playlistObject.id);

        if (newName === ""){return}
        if (playlistToEdit.id !== "L2I37"){playlistToEdit.name = newName;}
        localStorage.setItem("playlists", JSON.stringify(playlists));

        showPlaylistView(document.getElementById("main-content"), playlistToEdit, "playlist");
        loadPlaylists()
        
        saveBtn.removeEventListener("click", saveChanges);

        modal.style.display = "none";
        wrapper.style.display = "none";
    }

    element.addEventListener("click", openMenu);
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
    const songModal = document.getElementById("song-modal");
    const wrapper = document.getElementById("songs-wrapper");

    createContextMenu(wrapper, songModal, event)
    hideContextMenu(songModal, wrapper)

    function handleAddModal(playlistId){
        const addToPlaylistBtn = document.getElementById("add-to-playlist-btn");
        const playlistCnt = document.getElementById("playlist-container-modal");
    
        addToPlaylistBtn.addEventListener("mouseover", function(event){
            event.preventDefault();
            playlistCnt.style.display = "flex";
        });
    
        addToPlaylistBtn.addEventListener("mouseout", function(event){
            event.preventDefault();
            playlistCnt.style.display = "none";
            
    
        });
        playlistCnt.innerHTML = "";

        for (playlist of playlists){
            if (playlist.id !== playlistId && playlist.id !== "L2I37"){
                let modalItem = document.createElement("div");
                modalItem.innerHTML = `<span>${playlist.name}</span>`;
                modalItem.dataset.id = playlist.id;
                playlistCnt.appendChild(modalItem);
            }
    
        }
        modalItems = playlistCnt.querySelectorAll("div");
        modalItems.forEach(item => {
            item.addEventListener("click", function(event){
                event.preventDefault();
                console.log(item.dataset.id)
                console.log(song)
                addToPlaylist(song, item.dataset.id)
            })
        })
    
    }

    function handleDelete(playlistId){ 
        const deleteButton = document.getElementById("remove-from-playlist-btn")
        
        deleteButton.addEventListener("click", function(event){
            removeSong(playlistId, song)
            songModal.style.display = "none";
            deleteButton.removeEventListener("click", removeSong)
        });
        
    }
    handleDelete(playlistId)
    handleAddModal(playlistId)
}