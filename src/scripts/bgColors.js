function generateBgColor() {
    var randomColor = 'rgba(' + Math.floor(Math.random() * 256) + ',' +
                    Math.floor(Math.random() * 256) + ',' +
                    Math.floor(Math.random() * 256) + ',' +
                    '0.767)';
    document.documentElement.style.setProperty('--gradient-color', randomColor);

}

function headerColor(currentView){
    const header = document.getElementById("header-playlist");
    
    if (currentView === 'playlist') { header.style.background = 'rgba(255, 255, 255, .08)' } 
    else if (currentView === 'home'){ header.style.background = 'none' }
}