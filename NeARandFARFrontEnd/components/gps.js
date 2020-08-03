// document.onload = this.getLocation();


const getLocation = function() {
    if (navigator.geolocation) {
        console.log('searching gps');
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                console.log('3. i showPosition', pos);
            
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
};


