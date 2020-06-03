var x = document.getElementById("loc");
let position = {};
async function getLocation() {
    console.log('searching position');
    if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(showPosition, errorFn);
        console.log('i getLocation', position);
        return position;
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(pos) {
    console.log('i showPosition', pos);
    position = pos;
    x.innerHTML = "Latitude: " + pos.coords.latitude +
    "<br>Longitude: " + pos.coords.longitude;
}

function errorFn(err) {
    console.error('an error occurred', err);
    x.innerHTML = `CHAOS! ${err}`;
}