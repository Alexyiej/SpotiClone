function handleFilters(playlist){
    const filtersBtn = document.getElementById("filters-btn-name");

    // dropdowns
    handleFiltersDropDown("filters", "filters-dropdown")
    handleFiltersDropDown("tempo", "tempo-dropdown")
    // tempo sort
    handleTempoClick("tempo-slow", playlist)
    handleTempoClick("tempo-medium", playlist)
    handleTempoClick("tempo-fast", playlist)

    // duration sort
    handleOrderSort("time-sort-btn", playlist, sortByDuration, filtersBtn)
    handleOrderSort("duration-sort", playlist, sortByDuration, filtersBtn)

    // date added sort
    handleOrderSort("date-sort-btn", playlist, sortByDateAdded, filtersBtn)
    handleOrderSort("date-sort", playlist, sortByDateAdded, filtersBtn)

    // A-Z Z-A album title sort
    handleOrderSort("album-sort-btn", playlist, sortByAlbum, filtersBtn)
    handleOrderSort("album-sort", playlist, sortByAlbum, filtersBtn)

    // A-Z Z-A songs title sort
    handleOrderSort("songs-sort-btn", playlist, sortBySongName, filtersBtn)
    handleOrderSort("title-sort", playlist, sortBySongName, filtersBtn)

    // id sort
    handleOrderSort("id-sort", playlist, sortByID, filtersBtn)

    // reset
    resetFilters("reset-all", playlist)

    // search filter
    handleSearchInput()
    handleSearch("filters-search-input", ".song")
}

function handleFiltersDropDown(btnElement, dropdownElement) {
    const btn = document.getElementById(btnElement);
    const dropdown = document.getElementById(dropdownElement);
    let isOpen = false;

    btn.addEventListener("click", () => {
        if (isOpen) {
            dropdown.style.display = "none";
            isOpen = false;
            document.getElementById("filters-dropdown").style.borderRadius = "8px 8px 8px 8px";
            closeDropDown("tempo-dropdown")

        } else {
            dropdown.style.display = "flex";
            isOpen = true;
            if (btnElement === "tempo") {
                document.getElementById("filters-dropdown").style.borderRadius = "8px 8px 8px 0";
            } 
        
        }
    });

    dropdown.addEventListener("click", (event) => {
        event.stopPropagation(); 
    });
}
function closeDropDown(dropDown){
    element = document.getElementById(dropDown);
    element.style.display = "none";

}
function resetFilters(element, playlist){
    const filtersBtn = document.getElementById("filters-btn-name");
    const btn = document.getElementById(element);

    btn.addEventListener("click", () => {
        playlist.songs.sort((a, b) => a.id - b.id)
        createHtmlSongs(mapLists(playlist.songs));
        handleFavSongs(playlist.id);

        filtersBtn.innerHTML = `Custom Order<i class='fa-solid fa-caret-down'></i>`;
    });

}

function handleTempoClick(tempo, playlist){
    const clickedElement = document.getElementById(tempo);

    clickedElement.addEventListener("click", () => {
        sortByTempo(tempo, playlist.songs, playlist.id)
    });
}

function handleOrderSort(element, playlist, sortFunc, filtersBtn){
    const clickedElement = document.getElementById(element);
    let ascOrder = true;

    clickedElement.addEventListener("click", () => {
        sortFunc(playlist.songs, playlist.id, ascOrder, filtersBtn)
        ascOrder = !ascOrder
    });
}

function sortByTempo(tempo, playlistSongs, id) {
    const mediumBpms = 110;
    const fastBpm = 130;
    const tempoLowerCase = tempo.toLowerCase(); 
    const tempoMap = {
        "tempo-slow": { filter: song => song.bpm < mediumBpms, label: "Tempo Slow" },
        "tempo-medium": { filter: song => song.bpm >= mediumBpms && song.bpm <= fastBpm, label: "Tempo Medium" },
        "tempo-fast": { filter: song => song.bpm > fastBpm, label: "Tempo Fast" }
    };

    function updatePlaylist(filterFunc, label) {
        const filtersBtn = document.getElementById("filters-btn-name");
        const filteredSongs = playlistSongs.filter(filterFunc);

        createHtmlSongs(mapLists(filteredSongs));
        handleFavSongs(id);
        handleSearch("filters-search-input", ".song")
        filtersBtn.innerHTML = `${label}<i class='fa-solid fa-caret-down'></i>`;
    }

    if (tempoMap[tempoLowerCase]) {
        updatePlaylist(tempoMap[tempoLowerCase].filter, tempoMap[tempoLowerCase].label);
    }
}


function sortByDuration(playlistSongs, id, ascOrder, filtersBtn){
    if (ascOrder){
        let label = "Duration Asc"
        filtersBtn.innerHTML = `${label}<i class='fa-solid fa-caret-down'></i>`;
        playlistSongs.sort((a, b) => a.duration - b.duration)
    } else if (!ascOrder){
        let label = "Duration Desc"
        filtersBtn.innerHTML = `${label}<i class='fa-solid fa-caret-down'></i>`;
        playlistSongs.sort((a, b) => b.duration - a.duration)
    }

    createHtmlSongs(mapLists(playlistSongs));
    handleFavSongs(id);
    handleSearch("filters-search-input", ".song")
}

function sortByDateAdded(playlistSongs, id, ascOrder, filtersBtn) {
    if (ascOrder){
        let label = "Date Asc"
        filtersBtn.innerHTML = `${label}<i class='fa-solid fa-caret-down'></i>`;
        playlistSongs.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))

    } else if (!ascOrder){
        let label = "Date Desc"
        filtersBtn.innerHTML = `${label}<i class='fa-solid fa-caret-down'></i>`;
        playlistSongs.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded))
    
    }

    createHtmlSongs(mapLists(playlistSongs));
    handleFavSongs(id);
    handleSearch("filters-search-input", ".song")
}

function sortByAlbum(playlistSongs, id, ascOrder, filtersBtn){
    if (ascOrder){
        let label = "Album A-Z"
        filtersBtn.innerHTML = `${label}<i class='fa-solid fa-caret-down'></i>`;
        playlistSongs.sort((a, b) => a.album.localeCompare(b.album));

    } else if (!ascOrder){
        let label = "Album Z-A"
        filtersBtn.innerHTML = `${label}<i class='fa-solid fa-caret-down'></i>`;
        playlistSongs.sort((a, b) => b.album.localeCompare(a.album));
    }

    createHtmlSongs(mapLists(playlistSongs));
    handleFavSongs(id);
    handleSearch("filters-search-input", ".song")
}

function sortBySongName(playlistSongs, id, ascOrder, filtersBtn){
    if (ascOrder){
        let label = "Songs A-Z"
        filtersBtn.innerHTML = `${label}<i class='fa-solid fa-caret-down'></i>`;
        playlistSongs.sort((a, b) => a.title.localeCompare(b.title));

    } else if (!ascOrder){
        let label = "Songs Z-A"
        filtersBtn.innerHTML = `${label}<i class='fa-solid fa-caret-down'></i>`;
        playlistSongs.sort((a, b) => b.title.localeCompare(a.title));
    }

    createHtmlSongs(mapLists(playlistSongs));
    handleFavSongs(id);
    handleSearch("filters-search-input", ".song")
}

function sortByID(playlistSongs, id, ascOrder, filtersBtn){
    if (ascOrder){
        let label = "Id Asc"
        filtersBtn.innerHTML = `${label}<i class='fa-solid fa-caret-down'></i>`;
        playlistSongs.sort((a, b) => a.id - b.id);

    } else if (!ascOrder){
        let label = "Id Desc"
        filtersBtn.innerHTML = `${label}<i class='fa-solid fa-caret-down'></i>`;
        playlistSongs.sort((a, b) => b.id - a.id);
    }

    createHtmlSongs(mapLists(playlistSongs));
    handleFavSongs(id);
    handleSearch("filters-search-input", ".song")
}

function handleSearch(inputElement, songElement){
    const input = document.getElementById(inputElement);
    const songs = document.querySelectorAll(songElement);

    input.addEventListener("keyup", () => {
        const filter = input.value.toLowerCase();

        songs.forEach((song) => {
            const title = song.querySelector(".song-name span");
            const album = song.querySelector(".desc");
            const songName = title.textContent.toLowerCase();
            const albumName = album.textContent.toLowerCase();

            if (songName.includes(filter) || albumName.includes(filter)) {
                song.style.display = "";
            } else {
                song.style.display = "none";
            }
        });
    });
}

function handleSearchInput(){
    const btn = document.getElementById("mg-glass");
    const input = document.getElementById("filters-search-input");

    btn.addEventListener("click", (event) => {
        input.style.display = "flex";
        input.classList.add("active"); 

        event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
        if (event.target !== input) {
            input.classList.remove("active"); 
            
            setTimeout(() => {
                input.style.display = "none";
            }, 300);
        }
    });

    input.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}