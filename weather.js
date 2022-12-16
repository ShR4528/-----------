const COORDS_LS = 'coords';
const API_KEY = '23a734b5891744cd56be5af448a907f6';
const weatherContainer = document.querySelector('.js-weather');

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weatherContainer.innerText = `${temperature} @ ${place}`
        });

}

function saveCoords(positionObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(positionObj));
}

function geoSuccssHandler(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const positionObj = {
        latitude,
        longitude
    }
    saveCoords(positionObj);
    getWeather(latitude, longitude);
}

function geoErrorHandler() {
    console.log('error')
}

function askCoords() {
    navigator.geolocation.getCurrentPosition(geoSuccssHandler, geoErrorHandler);
}

function getCoords() {
    const coords = localStorage.getItem(COORDS_LS);
    if (coords === null) {
        askCoords();
    } else {
        const loadedCoords = JSON.parse(coords);
        getWeather(loadedCoords.latitude, loadedCoords.longitude);
    }
}

function init() {
    getCoords()
}
init();