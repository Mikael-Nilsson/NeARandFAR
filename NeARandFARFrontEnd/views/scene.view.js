
const sceneView = Vue.component('sceneview', {
    name: 'sceneview',
    created: async function() {
        console.log('position in scene.view', gpsService.position.coords.latitude);
        await this.getAssets();
        this.buildTemplate();

        // TODO: Check if cursor-listener is registered
        AFRAME.registerComponent('cursor-listener', {
            init: function() {}
        });

    },
    mounted: function() {
        console.log('sceneview mounted');

                // Populate iframe
//        let frameDocument = `<html>
//<head>
//        <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
//        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
//</head>
//<body><sceneview v-bind:object-array="private.objectArray"></sceneview></body></html>
//`;
//        let iframe = document.getElementById('frameframe');
//        iframe.contentDocument.write(frameDocument);
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
            //const d = await getData();
            const assets = await assetService.getData();
            console.log('assets', assets);

            // Adding compass
            //const dir = this.compass();
            //dir.forEach(element => {
            //    assets.push(element);
            //});

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
        },
        hide: function () {
            this.private.show = false;
        },
        createEntityHTML: function () {

            let entities = '';
            
            this.private.objectArray.slice(1,2).forEach(obj => {
                let entity = '';
                if (obj.geometry === 'text') {
                    entity = `<a-text value="${obj.value}" look-at="[gps-camera]" scale="${obj.scale}" gps-entity-place="${obj.entityPos}"></a-text>`;

                } else if (obj.geometry === 'sphere') {
                    entity = `<a-sphere gps-entity-place="${obj.entityPos}" start-conversation="${obj.conversation}" scale="${obj.scale}" color="${obj.color}" />`
                }

                entities += `\n${entity}`;

            });
            
            return entities;
        },
        // building the a-scene in an iframe as arjs doesn't accept shutting off the camera when leaving the view
        buildTemplate: async function () {
            let frame = document.getElementById('frameview');
            let sceneDiv = frame.contentDocument.getElementById('sceneview');

            const entities = this.createEntityHTML();

            console.log(entities);

            // <template v-for="asset in private.objectArray">
    //                        <template v-if="asset.geometry == 'text'">
    //                            <a-text v-bind:value="asset.value" look-at="[gps-camera]" v-bind:scale="asset.scale" v-bind:gps-entity-place="asset.entityPos" v-bind:start-conversation="asset.conversation"></a-text>
    //                    </template>
    //                    <template v-else-if="asset.geometry == 'sphere'">
    //                        <a-sphere v-bind:gps-entity-place="asset.entityPos" v-bind:start-conversation="asset.conversation" v-bind:scale="asset.scale" color="#0ffff0"></a-sphere>
    //                    </template>
    //                </template >



            let html = `
<div>
    <a-scene vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        
        <a-box position="0 2 -6" color="#848400"></a-box>
        <a-text position="0 0 -3" value="nu kanske" color="#830439"></a-text>

        <a-text value="This content will always face you." look-at="[gps-camera]" scale="120 120 120" gps-entity-place="latitude: <add-your-latitude>; longitude: <add-your-longitude>;"></a-text>

    <a-camera gps-camera rotation-reader>
            <a-cursor></a-cursor>
        </a-camera>

    </a-scene>
</div>
`;

            sceneDiv.innerHTML = html;
            
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
        },
        
    },
    data: function() {
        return {
            private: {
                loadingState: true,
                objectArray: [],
                compassPin: {
                    pos: `latitude: shared.position.latitude; longitude: shared.position.latitude;`
                },
                show: true
            },
            shared: globalState
        }
    }, 
    
    //render: function (createElement) {
    //    return createElement('div', {}, 'test');
    //}
    template: `<div id="sceneview"></div>`
});


§1§