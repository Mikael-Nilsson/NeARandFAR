console.log('initializing map');

const mapView = Vue.component('mapview', {
    created: function() {
    },
    mounted: function () {
        this.map = L.map('map').setView([38.63, -90.23], 12); // TODO: Use actual GPS

        this.tileLayer = L.tileLayer(
            'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
            }
        ); this.tileLayer.addTo(this.map);
    },
    data: function () {
        return {
            map: null,
            tileLayer: null,
            layers: []
        };
    },
    template: `
    <div id="map"></div>
    `
});