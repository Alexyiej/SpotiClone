function generateBgColor() {
    var color = randomColor(); 

    var gradientColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 0.5)';
    var headerColor = 'rgba(' + Math.max(0, color.r - 30) + ',' +  Math.max(0, color.g - 30) + ',' +Math.max(0, color.b - 30) + ', 1)';

    document.documentElement.style.setProperty('--gradient-color', gradientColor);
    document.documentElement.style.setProperty('--header', headerColor);
}

function randomColor() {
    var color = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
    return color;
}

function headerColor(currentView){
    const header = document.getElementById("header-playlist");
    
    if (currentView === 'playlist') { header.style.background = 'rgba(255, 255, 255, .08)' } 
    else if (currentView === 'home'){ header.style.background = 'none' }
}

