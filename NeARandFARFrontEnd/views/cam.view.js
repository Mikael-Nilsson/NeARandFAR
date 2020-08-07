
const camView = Vue.component('camview', {
    created: function() {
        console.log('position in cam.view', global.position);
        this.assets();

    },
    methods: {
        assets: async function() {
            const d = await getData();
            
            d.push({
              geometry: 'text',
              scale: '40 40 40',
              value: 'Am I close?',
              position: {
                lat: global.position.latitude + 0.005,
                lon: global.position.longitude
              }
            });

            console.log('data collected', d.length);
            
            this.assetArray = d.map(p => {
             return {
              geometry: p.geometry,
              value: p.value,
              scale: p.scale,
              position: p.position,
              entityPos: `latitude: ${p.position.latitude}; longitude: ${p.position.longitude}`
             }
            });
        }
    },
    computed: {
        pos: function() {
            console.log('position in pos', global.position);
            const pos = `latitude: ${global.position.latitude}; longitude: ${global.position.longitude}`;
            return pos;
        },
        loading: function() {

            if (!global.position
                || this.assetArray.length === 0)
                this.loadingState = true;
            else
                this.loadingState = false;
            
            return this.loadingState;
        }
    },
    data: function() {
        return {
           loadingState: true,
           assetArray: []
        }
    },
    template: `
        <div>
            <template v-if="loading">
                <div>loading...</div>
                <div>{{pos}}</div>
                <div>{{assetArray}}</div>
            </template>
            <template v-if="!loading">
                <a-scene class="aframebox">
                <!--<a-scene ar vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; debugUIEnabled: false;">-->

                    <template v-for="asset in assetArray">
                        <template v-if="asset.geometry == 'text'">
                            <a-text v-bind:value="asset.value" look-at="[gps-camera]" v-bind:scale="asset.scale" v-bind:gps-entity-place="asset.entityPos"></a-text>
                        </template>
                    </template>

<!--                    
                    <a-text v-bind:value="assetArray.length" look-at="[gps-camera]" scale="40 40 40" gps-entity-place="latitude: 59.292531; longitude: 18.050466;"></a-text>
                    <a-text value="B" scale="100 100 100" gps-entity-place="latitude: 59.293000; longitude: 18.050500;"></a-text>
                    <a-text value="C" look-at="[gps-camera]" scale="2000 2000 2000" gps-entity-place="latitude: 59.292631; longitude: 18.050566;"></a-text>
-->

                    <a-camera gps-camera rotation-reader> </a-camera>
                </a-scene>
            </template>

        </div>
    `
});



