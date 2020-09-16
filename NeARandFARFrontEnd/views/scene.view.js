
const sceneView = Vue.component('sceneview', {
    name: 'sceneview',
    created: function() {
        console.log('position in scene.view', gpsService.position.coords.latitude);
        this.getAssets();

        AFRAME.registerComponent('cursor-listener', {
            init: function() {
                console.log('test');
            }
        });

    },
    mounted: function() {
        console.log('mounting scene view');
        this.buildTemplate();

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
        // building the a-scene in an iframe as arjs doesn't accept shutting off the camera when leaving the view
        buildTemplate: function () {
            let sceneDiv = document.getElementById('scene');
            const frame = `<iframe id="sceneFrame" style="width:100%; height:100%; position: absolute; top: 0%;"></iframe>`;

            let sceneFrame = document.getElementById('sceneFrame');


            if (this.shared.camActive) {


                const aFrame = `
    <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-event-set-component@3.0.3/dist/aframe-event-set-component.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.slim.js"></script>
    <script src="https://unpkg.com/aframe-look-at-component@1.0.0/dist/aframe-look-at-component.min.js"></script>
    <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
`;

                const entities = this.private.objectArray.map(obj => {
                    console.log('mounting', obj.geometry, obj.value, obj.scale, obj.entityPos, obj.conversation);
                    if (obj.geometry == 'text')
                        return `<a-text value="${obj.value}" look-at="[gps-camera]" scale="${obj.scale}" gps-entity-place="${obj.entityPos}" start-conversation="${obj.conversation}"></a-text>`;
                    else if (obj.geometry == 'sphere')
                        return `<a-sphere gps-entity-place="${obj.entityPos}" start-conversation="${obj.conversation}" scale="${obj.scale}" color="#0ffff0"></a-sphere>`;
                });

                console.log('entities', entities);

                const scene = `
                    <a-scene ar vr-mode-ui="enabled: false" embedded arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">
                        ${entities}
                        <a-camera gps-camera rotation-reader>
                            <a-cursor></a-cursor>
                        </a-camera>
                    </a-scene>`;

                let html = `
<html><head>                                    
    ${aFrame}
</head><body>
    ${scene}
</body></html>
`;

                sceneDiv.innerHTML = scene;
                sceneFrame.contentDocument.write(html);

            } else {
                sceneFrame.contentDocument.write('');
                sceneDiv.innerHTML = '';
                //sceneDiv.style.display = 'none';
            }

            
            //console.log(scene);

    //        let html = `
    //            <div id = "sceneview">

    //                    <template v-for="asset in private.objectArray">
    //                        <template v-if="asset.geometry == 'text'">
    //                            <a-text v-bind:value="asset.value" look-at="[gps-camera]" v-bind:scale="asset.scale" v-bind:gps-entity-place="asset.entityPos" v-bind:start-conversation="asset.conversation"></a-text>
    //                    </template>
    //                    <template v-else-if="asset.geometry == 'sphere'">
    //                        <a-sphere v-bind:gps-entity-place="asset.entityPos" v-bind:start-conversation="asset.conversation" v-bind:scale="asset.scale" color="#0ffff0"></a-sphere>
    //                    </template>
    //                </template >

    //<a-text v-bind: value="private.objectArray.length" look-at="[gps-camera]" scale="40 40 40" gps-entity-place="latitude: 59.292531; longitude: 18.050466;"></a-text>

    //<a-camera gps-camera rotation-reader>
    //    <a-cursor></a-cursor>
    //</a-camera>
    //            </a - scene >
    //    </div >
    //`;

            

            
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
                show: true,
                html: '<div>variable</div>'
            },
            shared: globalState
        }
    },
    watch: {
        'shared.camActive': function () {
            console.log(this.shared.camActive);
            this.buildTemplate();
        }
    },
    //render: function (createElement) {
    //    return createElement('div', {}, 'test');
    //}
    template: `<div id="scene"></div>`
});




