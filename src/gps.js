var x = document.getElementById("loc");
let position = {};

// document.onload = this.getLocation();

function getLocation() {
    console.log('2. searching position');
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(showPosition, errorFn);
        });
        
        
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(pos) {
    console.log('3. i showPosition', pos);
    position = pos;
    x.innerHTML = "Latitude: " + pos.coords.latitude +
    "<br>Longitude: " + pos.coords.longitude;

    resolve(pos);

}

function errorFn(err) {
    console.error('an error occurred', err);
    x.innerHTML = `CHAOS! ${err}`;

    reject(err);
}