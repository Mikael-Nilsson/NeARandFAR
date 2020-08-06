
const camView = Vue.component('camview', {
    props: ['position'],
    created: function() {
        console.log('position in cam.view', this.position);
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
                lat: this.position.latitude + 0.005,
                lon: this.position.longitude
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
            console.log('position in pos', this.position);
            const pos = `latitude: ${this.position.latitude}; longitude: ${this.position.longitude}`;
            return pos;
        },
        loading: function() {

            if (!this.position
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
    /*
    Kanske skapa aframe-scenen och peta in i en iframe a la
    <iframe></iframe>

document.querySelector('iframe')
        .contentDocument.write("<h1>Injected from parent frame</h1>")
    */
    template: `
        <div>
        <!--
            <template v-if="loading">
                <div>loading...</div>
                <div>{{pos}}</div>
                <div>{{assetArray}}</div>
            </template>
            <template v-if="!loading">
                <a-scene ar vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; debugUIEnabled: false;">

                    <template v-for="asset in assetArray">
                        <template v-if="asset.geometry == 'text'">
                            <a-text v-bind:value="asset.value" look-at="[gps-camera]" v-bind:scale="asset.scale" v-bind:gps-entity-place="asset.entityPos"></a-text>
                        </template>
                    </template>
-->
<!--                    
                    <a-text v-bind:value="assetArray.length" look-at="[gps-camera]" scale="40 40 40" gps-entity-place="latitude: 59.292531; longitude: 18.050466;"></a-text>
                    <a-text value="B" scale="100 100 100" gps-entity-place="latitude: 59.293000; longitude: 18.050500;"></a-text>
                    <a-text value="C" look-at="[gps-camera]" scale="2000 2000 2000" gps-entity-place="latitude: 59.292631; longitude: 18.050566;"></a-text>
-->
<!--                    
                    <a-camera gps-camera rotation-reader> </a-camera>
                </a-scene>
            </template>
-->
        <p>camview</p>
        </div>
    `
});



