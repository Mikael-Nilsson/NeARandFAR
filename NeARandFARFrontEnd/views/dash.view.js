const dashView = Vue.component('dashview', {
    mounted: function() {
        console.log('mounting dashboard');
    },
    methods: {
        logout: function() {
            console.log('logging out');
            localStorage.removeItem('sessionActive');
            localStorage.removeItem('apiKey');
            this.$router.push({path: '/#/'});
        }
    },
    data: function() {
        return {
            pos: gpsService.position.coords
        };
    },
    template: `
    <div>
        <div>{{pos.latitude}}, {{pos.longitude}}</div>
        <button id="logout" v-on:click="logout()">logout</button>
    </div>
    `
});