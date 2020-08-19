// TODO: Decide which auth provider, implement for realsies

const loginView = Vue.component('loginview', {
    methods: {
        login: async function() {
            const data = await userService.login(this.username, this.password);

            console.log(data);
            if(data) {
                console.log('username checks out');
                this.$emit('start');
            } else {
                console.log('bad password');
            }
             
        }
    },
    data: function() {
        return {
            username: '',
            password: ''
        }
    },
    template: `
    <div>
        <input v-model="username" placeholder="username"><br />
        <input v-model="password" placeholder="password"><br />
        <button v-on:click="login()">login</button>
    </div>
    `
});