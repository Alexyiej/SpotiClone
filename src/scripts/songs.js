function createSong(song){
    const playlistView = document.getElementById('songs-wrapper')
    const songElement = document.createElement('article')
    songElement.className = "song"
    songElement.innerHTML = `
        <div>
            <span class="desc-big song-index" >${song.id}</span>
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
                <i class="fa-regular fa-heart"></i>
                <span class="desc-big">4.29</span>
            </div>
        </div>
    `
    playlistView.appendChild(songElement)
}

function addSongs(songsList){
    const playlistView = document.getElementById('songs-wrapper')
    playlistView.innerHTML = ''
    songsList.forEach(song => createSong(song))
}