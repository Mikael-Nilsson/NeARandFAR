// document.onload = this.getLocation();

const gpsService = {
    position: {},

    getLocation: function() {
        if (navigator.geolocation) {
            this.shared.log('searching gps');
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition((pos) => {
                    this.position = pos;
                    this.shared.log('3. i showPosition', this.position);
                    resolve(pos);
                }, (err) => {
                    console.error('an error occurred', JSON.stringify(err));
     
                
                    reject(err);
                });
            });
            
            
        } else {
            const err = "Geolocation is not supported by this browser.";
            console.error(err);
            var x = document.getElementById("loc");
            x.innerHTML = err;
        }
    }
};



