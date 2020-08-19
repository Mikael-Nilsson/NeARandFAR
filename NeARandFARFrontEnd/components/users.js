const userService = {  
    apiKey: null,
    login: async function(username, password) {

        const tokenUrl = 'https://43tkyvf00i.execute-api.eu-north-1.amazonaws.com/dev/token';
        console.log('checking creds against', tokenUrl);

        const body = JSON.stringify({username, password});
        let token = null;

        token = await dataService.post(tokenUrl, body);
        this.apiKey = token;
        console.log('success in userservice', token);
        return true;

    }
};


