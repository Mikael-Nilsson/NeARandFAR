console.log('initializing map');

const mapView = Vue.component('mapview', {
    created: function() {
    },
    mounted: function () {
        this.initMap();
    },
    data: function () {
        return {
            map: null,
            tileLayer: null,
            layers: []
        };
    },
    methods: {
        initMap() {
            this.map = L.map('map').setView([59.30, 18.12], 12); this.tileLayer = L.tileLayer(
                'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
                {
                    maxZoom: 18,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
                }
            ); this.tileLayer.addTo(this.map);
        },
    },
    template: `
    <div id="map" class="map"></div>
    `
});