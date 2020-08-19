// TODO: Manage headers
// TODO: Support the other methods

const dataService = {
    get: function(url) {
        return this.send(url, 'GET',null, null);
    },

    post: function(url, body) {
        return this.send(url, 'POST', body, null);
    },

    send: function(url, method, body, options) {
        return new Promise((resolve) => {

            console.log(`${method}:ing ${body} to ${url}`);
            
            let xhr = new XMLHttpRequest();
            
            const options = {};
            
            xhr.open(method, url, options);
            xhr.send([body]);
            
            xhr.onload = () => {
                if(xhr.status == 200) {
                    console.log('success!');
                    resolve(xhr);   
                }
            };
            
        });
    }
}


