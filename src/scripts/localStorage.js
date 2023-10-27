function getLastView(){
    const storedData = localStorage.getItem("current-view");
    const mainContent = document.getElementById("main-content");

    if (storedData) {
        const parsedData = JSON.parse(storedData);

        if (parsedData.name === "home"){
            showHomeView(mainContent)

            let currentView = "home"
            return currentView

        }

        else if (parsedData.name === "playlist"){
            const playlist = parsedData.view;
            showPlaylistView(mainContent, playlist)

            let currentView = "playlist"
            return currentView

        }

    }
}

function loadPlaylists() {
    const loclalStoragePlaylists = JSON.parse(localStorage.getItem("playlists"));
    const localStoragePlaylistsIndex = localStorage.getItem("playlists-index");

    const playlistsWrapper = document.querySelector(".playlists-wrapper");
    playlistsWrapper.innerHTML = "";

    if (localStoragePlaylistsIndex) {
        playListIndex = localStoragePlaylistsIndex;

    } else {
        playListIndex = 0;
    }

    if (loclalStoragePlaylists) {
        playlists = loclalStoragePlaylists;

        for (playlist of playlists) {
            createPlaylists(playlist, localStoragePlaylistsIndex);
        }
    
    } else {
        console.log("No playlists found in local storage");
    }
}