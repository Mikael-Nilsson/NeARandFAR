import Vue from 'vue';
import 'aframe';

import app from './app.vue'

new Vue({
    render: h => h(app),
}).$mount('#app');