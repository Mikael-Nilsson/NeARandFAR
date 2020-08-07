// TODO: Decide which auth provider, implement for realsies

const loginView = Vue.component('loginview', {
    methods: {
        login: function() {
            if(this.username === 'q' && this.password === 'q') {
                localStorage.setItem('sessionActive', true);
                this.$emit('start');
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