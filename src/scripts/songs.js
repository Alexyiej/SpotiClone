function createSong(song) {
    const playlistView = document.getElementById('songs-wrapper');
    const songElement = document.createElement('article');
    const [unliked, liked] = changeIcon(song)
    songElement.className = "song";
    songElement.innerHTML = `
        <div>
            <span class="desc-big song-index">${song.id}</span>
            <div class="song-icon-ctn">
                <img src="${song.coverUrl}" alt="">
            </div>
            <div class="song-name">
                <span>${song.title}</span>
                <span class="desc">${song.album}</span>
            </div>
        </div>
        <div>
            <div>
                <span class="desc-big">${song.album}</span>
            </div>
            <div>
                <span class="desc-big">28 Oct 2022</span>
            </div>
            <div>
                <i class="fa-regular fa-heart like-song" style="display: ${unliked}"></i>
                <i class="fa-solid fa-heart liked-song" style="display: ${liked}"></i>
                <span class="desc-big">4.29</span>
            </div>
        </div>
    `;
    songElement.dataset.id = song.id;
    playlistView.appendChild(songElement);
}

function handleFavSongs(id){
    const songs = document.querySelectorAll('.song')
    const playlistView = document.getElementById('songs-wrapper')

    songs.forEach(song => {
        song.addEventListener('contextmenu', function(event){
            event.preventDefault()
            handleSongContextMenu(event, song, id)
        })
    });

    songs.forEach(song => {
        likeBtns = song.querySelectorAll('.fa-heart')
        likeBtns.forEach(btn => {
            btn.addEventListener('click', function(event){
                event.preventDefault()
                handleLike(song, id, likedSongs)
            })
        })
    });
}

function createHtmlSongs(argSongs) {
    for (song of argSongs) {
        createSong(song);
    }
}

function removeSong(playlistId, songElement){
    const songToRemove = songs.find(song => song.id === songElement.dataset.id)
    const playlistToRemoveFrom = playlists.find(playlist => playlist.id === playlistId)

    playlistToRemoveFrom.songs = playlistToRemoveFrom.songs.filter(song => song.id !== songToRemove.id)
    localStorage.setItem('playlists', JSON.stringify(playlists))
    console.log(playlistToRemoveFrom)
    reloadView(playlistId)
}

function reloadView(playlistId){
    //loadPlaylists()

    const mainContent = document.getElementById("main-content");
    const playlistView = document.getElementById('playlist-view')

    const playlist = playlists.find(playlist => playlist.id === playlistId)
    playlistView.innerHTML = ''
    showPlaylistView(mainContent, playlist)
}

function handleLike(song, playlistId, likedSongs) {
    const songId = song.dataset.id;
    const playlist = playlists.find(playlist => playlist.id === playlistId);
    let index = -1
    let songToLike = null;

    if (playlist.id !== "L2I37") {
        songToLike = playlist.songs.find(song => song.id === songId);
    } else {
        songToLike = likedSongs.find(song => song.id === songId);
    }

    if (songToLike) {
        songToLike.liked = !songToLike.liked;

        if (likedSongs){ index = likedSongs.findIndex(likedSong => likedSong.id === songToLike.id); }
        else{ index = -1 }

        if (index !== -1) { likedSongs.splice(index, 1); } 
        else { likedSongs.push(songToLike); }

        localStorage.setItem('liked-songs', JSON.stringify(likedSongs));
        reloadView(playlistId)

    } else {
        console.log("Song not found.");
    }

}

function changeIcon(song){
    let unliked = 'flex'
    let liked = 'none'

    if (song.liked){
        unliked = 'none'
        liked = 'flex'
    }

    return [unliked, liked]
}

function mapLists(songs) {
    const mappedSongs = [];
    likedSongs = JSON.parse(localStorage.getItem('liked-songs'));

    if (likedSongs) {
        for (song of songs) {
            const likedSong = likedSongs.find(likedSong => likedSong.id === song.id);

            if (likedSong) {
                mappedSongs.push(likedSong);
            } else {
                // Ustaw liked na false, jeśli piosenka nie jest polubiona
                mappedSongs.push({ ...song, liked: false });
            }
        }
    console.log(mappedSongs)

        return mappedSongs;
    } else {
    console.log(mappedSongs)

        // Jeśli nie ma polubionych piosenek, ustaw liked na false dla każdej piosenki
        return songs.map(song => ({ ...song, liked: false }));
    }
}


function addToPlaylist(songElement, playlistId){
    const playlist = playlists.find(playlist => playlist.id === playlistId)
    const songToAdd = songs.find(song => song.id === songElement.dataset.id)

    if (playlist.songs.find(song => song.id === songToAdd.id)){
        console.log('Song already in playlist')
        return
    }

    playlist.songs.push(songToAdd)
    localStorage.setItem('playlists', JSON.stringify(playlists))

}
