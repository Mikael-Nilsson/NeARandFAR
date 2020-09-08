
const camView = Vue.component('camview', {
    created: function() {
        console.log('position in cam.view', gpsService.position.coords.latitude);
        this.getAssets();

        AFRAME.registerComponent('cursor-listener', {
            init: function() {
                console.log('test');
            }
        });

    },
    mounted: function() {
        console.log('mounting cam view');
    },
    methods: {
        compass: function () {
            console.log('adding compass at ', gpsService.position.coords.latitude, gpsService.position.coords.longitude);
            return [
                {
                    geometry: 'text',
                    scale: '20 20 20',
                    value: 'north',
                    position: {
                        lat: gpsService.position.coords.latitude + 0.001,
                        lon: gpsService.position.coords.longitude,
                    }
                },
                {
                    geometry: 'text',
                    scale: '20 20 20',
                    value: 'south',
                    position: {
                        lat: gpsService.position.coords.latitude - 0.001,
                        lon: gpsService.position.coords.longitude,
                    }
                },
                {
                    geometry: 'text',
                    scale: '20 20 20',
                    value: 'east',
                    position: {
                        lat: gpsService.position.coords.latitude,
                        lon: gpsService.position.coords.longitude + 0.001,
                    }
                },
                {
                    geometry: 'text',
                    scale: '20 20 20',
                    value: 'west',
                    position: {
                        lat: gpsService.position.coords.latitude,
                        lon: gpsService.position.coords.longitude - 0.001,
                    }
                },

            ];
        },
        whenClick: function(el, data) {
            console.log('activity started');
        },
        getAssets: async function() {
            // TODO: Rewrite using Rxjs
            const d = await getData();
            const assets = await assetService.getData();
            console.log('assets', assets);

            // Adding compass
            const dir = this.compass();
            dir.forEach(element => {
                assets.push(element);
            });

           
            // Putting assets in object list
            this.private.objectArray = assets.map(p => {
                return {
                    geometry: p.geometry,
                    value: p.value,
                    scale: p.scale,
                    position: p.position,
                    entityPos: `latitude: ${p.position.lat}; longitude: ${p.position.lon};`,
                    conversation: `id: ${p.conversationId}`,
                    speechBubble: `size:2.5 1 0.01; text:${p.value};`
                };
            });

            const NPCs = await NPCservice.getNPCs(null, gpsService.position);
            console.log('nearby npcs found', NPCs);

            for(let i=0; i< NPCs.length; i++) {
                const conversation = await conversationService.getConversation(NPCs[i].conversationStart);
                console.log('conversation collected', conversation);

                const npcObject = {
                    geometry: NPCs[i].geometry,
                    value: conversation.line,
                    scale: NPCs[i].scale,
                    position: NPCs[i].position,
                    entityPos: `latitude: ${NPCs[i].position.lat}; longitude: ${NPCs[i].position.lon}`,
                    conversation: `id: ${NPCs[i].conversationStart}`,
                    speechBubble: `size:2.5 1 0.01; text:${conversation.line};`
                };

                this.private.objectArray.push(npcObject);
                
            }

            console.log('data collected', this.private.objectArray);
        }
    },
    computed: {
        pos: function() {
            console.log('position in pos', gpsService.position);
            const pos = `latitude: ${gpsService.position.coords.latitude}; longitude: ${gpsService.position.coords.longitude};`;
            return pos;
        },
        loading: function() {

            if (!gpsService.position
                || this.private.objectArray.length === 0)
                this.private.loadingState = true;
            else
                this.private.loadingState = false;
            
            return this.private.loadingState;
        }
    },
    data: function() {
        return {
            private: {
                loadingState: true,
                objectArray: [],
                compassPin: {
                    pos: `latitude: shared.position.latitude; longitude: shared.position.latitude;`
                }
            },
            shared: globalState
        }
    },
    template: `
        <div>
            <template v-if="loading">
                <div>loading...</div>
                <div>{{pos}}</div>
                <div>{{private.objectArray}}</div>
            </template>
            <template v-if="!loading">
                <a-scene ar vr-mode-ui="enabled: false" embedded arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">
<!--            <a-scene ar vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; debugUIEnabled: false;">
-->
            
                    
                    <template v-for="asset in private.objectArray">
                        <template v-if="asset.geometry == 'text'">
                            <a-text v-bind:value="asset.value" look-at="[gps-camera]" v-bind:scale="asset.scale" v-bind:gps-entity-place="asset.entityPos" v-bind:start-conversation="asset.conversation"></a-text>
                        </template>
                        <template v-else-if="asset.geometry == 'sphere'">
                            <a-sphere v-bind:gps-entity-place="asset.entityPos" v-bind:start-conversation="asset.conversation" v-bind:scale="asset.scale" color="#0ffff0"></a-sphere>
                        </template>
                    </template>

            <!--
                    <a-sphere position="2 1.25 -5" radius="1.25" color="#EF2D5E" 
                    event-set__down="_event: mousedown; color: #8FF7FF"
                    event-set__up="_event: mouseup; color: #4CC3D9"></a-sphere>
            -->

                    <a-text v-bind:value="private.objectArray.length" look-at="[gps-camera]" scale="40 40 40" gps-entity-place="latitude: 59.292531; longitude: 18.050466;"></a-text>

                    <!--<a-cone radius-bottom="0.1" radius-top="0.01" rotation="0 0 90" />
-->
                    <!-- <a-box height="0.1" width="0.1" depth="20" gps-entity-place="private.compasspin.pos" />
-->
            
                    <a-camera gps-camera rotation-reader>
                        <a-cursor></a-cursor>
                    </a-camera>
                </a-scene>
            </template>
    
        </div>
    `
});



