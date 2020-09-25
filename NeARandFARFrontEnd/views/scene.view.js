
const sceneView = Vue.component('sceneview', {
    name: 'sceneview',
    created: async function() {
        console.log('position in scene.view', gpsService.position.coords.latitude);

        if (!AFRAME.components["cursor-listener"]) {
            AFRAME.registerComponent('cursor-listener', {
                init: function () { }
            });
        }

        this.buildTemplate();
        await this.getAssets();

    },
    mounted: function () {

        console.log('mounting', this.html);

       

        
        let frame = document.getElementById('frameview');

        let sceneDiv = frame.contentDocument.getElementById('sceneview');
        console.log(sceneDiv);

        // ! Y DAFU can't I find an event that reliably runs after external scripts ? THIS WON'T WORK FOR REAL !
        const scene = this.private.scene;
        setTimeout(function () {
            sceneDiv.appendChild(scene);
        }, 1500);
        

        console.log('sceneview mounted');
        
    },
    update: async function () {
        console.log('sceneview beforeupdate');
    },
    data: function () {
        return {
            private: {
                loadingState: true,
                objectArray: [],
                compassPin: {
                    pos: `latitude: shared.position.latitude; longitude: shared.position.latitude;`
                },
                show: true,
                html: '',
                scene: null
            },
            shared: globalState
        }
    },
    methods: {
        getAssets: async function () {
            // TODO: Rewrite using Rxjs
            const assets = await assetService.getData();
            console.log('assets', assets);

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
            let objects = [];

            for (let i = 0; i < NPCs.length; i++) {
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

            this.private.objectArray.concat(this.compass());

            console.log('data collected', this.private.objectArray);
        },

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

        // building the a-scene in an iframe as arjs doesn't accept shutting off the camera when leaving the view
        buildTemplate: async function () {

            let frame = document.getElementById('frameview');
            const contentDocument = frame.contentDocument;

            // Set up scene
            this.private.scene = contentDocument.createElement('a-scene');
            this.private.scene.setAttribute('id', 'scene');
            this.private.scene.setAttribute('vr-mode-ui', 'enabled');
            this.private.scene.setAttribute('embedded', 'true');
            this.private.scene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false');

            // For some wicked reason I can't create the camera by createElement
            let innerHtml = `
    <a-camera gps-camera rotation-reader>
        <a-cursor></a-cursor>
    </a-camera>
`;
            this.private.scene.innerHTML = innerHtml;

            // dev box -> Remove this later
            console.log('creating box');
            let box = contentDocument.createElement('a-box');
            this.private.scene.appendChild(box);
            //box.setAttribute('position', '1 0.5 -3');
            box.setAttribute('position', {x: 1,y: 0.5, z: -3});
            box.setAttribute('rotation', '0 45 0');
            box.setAttribute('color', '#4CC300');

        },
        renderObjects: async function () {
            console.log('rendering', this.private.objectArray.length, 'objects');
            const contentDocument = document.getElementById('frameview').contentDocument;
            
            // Entities
            //if (this.private.objectArray.length > 0) {
            for (let i = 0; i < this.private.objectArray.length; i++) {
                const obj = this.private.objectArray[i];
                console.log('adding object', obj.value, obj.position);

                let entity = contentDocument.createElement('a-text'); // TODO: Fix for other objects
                this.private.scene.appendChild(entity);
                entity.setAttribute('look-at', '[gps-camera]');
                entity.setAttribute('value', obj.value);
                entity.setAttribute('gps-entity-place', `latitude: ${obj.position.lat}; longitude: ${obj.position.lon}`);
                entity.setAttribute('scale', '80 80 80');
                console.log(entity);

            }
            //}
        }
    },
    watch: {
        'private.objectArray': async function () {
            //this.buildTemplate();
            this.renderObjects();
        }
    },
  
    template: `
<div id="sceneview">

</div>`
});

