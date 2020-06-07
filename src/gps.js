var x = document.getElementById("loc");

// document.onload = this.getLocation();


export const getLocation = () => {
    console.log('2. searching position');
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                console.log('3. i showPosition', pos);
                x.innerHTML = "Latitude: " + pos.coords.latitude +
                "<br>Longitude: " + pos.coords.longitude;

                resolve(pos);
            }, (err) => {
                console.error('an error occurred', err);
                x.innerHTML = `CHAOS! ${err}`;
            
                reject(err);
            });
        });
        
        
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
};


