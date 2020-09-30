const userService = {  
    login: async function(username, password) {

        const tokenUrl = 'https://43tkyvf00i.execute-api.eu-north-1.amazonaws.com/dev/token';
        this.shared.log('checking creds against', tokenUrl);

        const body = JSON.stringify({username, password});
        let token = null;

        token = await dataService.post(tokenUrl, body);
        // FIXME: Seems like we're gonna need some real auth, this isn't ok. Might be no auth for readers and auth for writers.
        // Then this app won'n need auth but the admin app will
        localStorage.setItem('apiKey', token);
        this.shared.log('success in userservice', token);
        localStorage.setItem('sessionActive', true);
        return true;

    }
};


