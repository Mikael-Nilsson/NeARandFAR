var x = document.getElementById("loc");
let position = {};

// document.onload = this.getLocation();

function getLocation() {
    console.log('2. searching position');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorFn);
        console.log('4. i getLocation, efter showposition', position);
        return position;
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(pos) {
    console.log('3. i showPosition', pos);
    position = pos;
    x.innerHTML = "Latitude: " + pos.coords.latitude +
    "<br>Longitude: " + pos.coords.longitude;
}

function errorFn(err) {
    console.error('an error occurred', err);
    x.innerHTML = `CHAOS! ${err}`;
}