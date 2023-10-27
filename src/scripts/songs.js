function createSong(song) {
    const playlistView = document.getElementById('songs-wrapper');
    const songElement = document.createElement('article');
    const [unliked, liked] = changeIcon(song)
    console.log(unliked, liked)

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
            console.log(id)
            removeSong(id, song)
        })
    });

    songs.forEach(song => {
        likeBtn = song.querySelector('.fa-heart')
        song.addEventListener('click', function(event){
            event.preventDefault()
            handleLike(song, id, likedSongs)
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

    reloadView(playlistId)
}

function reloadView(playlistId){
    loadPlaylists()

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
    } else {
        console.log("Song not found.");
    }
    reloadView(playlistId)

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

function mapLists(likedSongs, songs){
    const mappedSongs = []

    if (likedSongs){
        for (song of songs){
            const likedSong = likedSongs.find(likedSong => likedSong.id === song.id)
    
            if (likedSong){
                mappedSongs.push(likedSong)
            } else{
                mappedSongs.push(song)
            }
        }
        return mappedSongs
    }
    else{ return songs }
   
}