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
            
            let request = new XMLHttpRequest();

            request.open(method, url);

            // ! APIKey isn't needed in the read frontend. This will be needed in the edit GUI later
            //const apiKey = localStorage.getItem('apiKey');
            //request.setRequestHeader('x-api-key', apiKey);
            
            request.send([body]);
            
            request.onreadystatechange = () => {
                if(request.readyState == 4 && request.status == 200) {
                    console.log('success!');
                    resolve(request.response);   
                }
            };
            
        });
    }
}


