const userService = {  
    login: function(username, password) {
        if (username && password) {
            localStorage.setItem('sessionActive', true);
            return true;
        } else return false;
    }
};
