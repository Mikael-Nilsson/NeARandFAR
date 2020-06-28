import Vue from 'vue';

import app from './app.vue'

import 'aframe';
import 'aframe-ar';
import 'aframe-look-at-component';

Vue.config.ignoredElements = [
    'a-scene',
    'a-entity',
    'a-camera',
    'a-box',
    'a-sky',
    'a-assets',
    'a-marker',
    'a-marker-camera',
    'a-text'
]

new Vue({
    render: h => h(app),
}).$mount('#app');