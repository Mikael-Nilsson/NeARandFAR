console.log('initializing map');

const mapView = Vue.component('mapview', {
  created: function () {
  },
  mounted: function () {
    this.initMap();
    this.initLayers();
    this.toggleFollow();
  },
  data: function () {
    return {
      private: {
        map: null,
        tileLayer: null,
        layers: [],
        currentPositionPointer: null,
        currentAccuracy: null
      },
      shared: globalState
    };
  },
  methods: {
    initMap() {
      // fix from gpsService
      console.log('init map');
      this.private.map = L.map('map').setView([59.30, 18.12], 12);
      this.private.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      );
      this.private.tileLayer.addTo(this.private.map);
    },
    initLayers() {
      console.log('initializing map layers');

      // Objects in map
      this.shared.objectArray.forEach(obj => {
        console.log('showing entity', obj.value, 'on map');
        obj.leafletObject = L.marker([obj.position.lat, obj.position.lon]).bindPopup(obj.type);
        obj.leafletObject.addTo(this.private.map);
      });
    },
    toggleFollow() {
      //const mapDiv = document.getElementById('map');

      if (this.shared.follow) {
        this.private.map.locate({ setView: true, watch: true });
        this.private.map.addEventListener('locationfound', (locationEvent) => {
          this.shared.position = { latitude: locationEvent.latitude, longitude: locationEvent.longitude };
          console.log('location located', locationEvent);

          // player
          if(this.private.currentPositionPointer) {
            this.private.map.removeLayer(this.private.currentPositionPointer)

          }

          this.private.currentAccuracy = locationEvent.accuracy;
          const radius = locationEvent.accuracy/2;
          this.private.currentPositionPointer = L.circle(locationEvent.latlng, radius).addTo(this.private.map);
        });

        //    const dot = document.createElement('span');
        //    mapDiv.appendChild(dot);
        //    dot.setAttribute('class', 'dot');
        //    dot.setAttribute('id', 'mapdot');

      } else {
        this.private.map.stopLocate();
        //    const dot = document.getElementById('mapdot');
        //    dot.setAttribute('hidden', true);

      }
    },
  },
  watch: {
    'shared.follow': function () {
      this.toggleFollow();
    }
  },
  template: `
    <div id="map" class="map"></div>
    `
});