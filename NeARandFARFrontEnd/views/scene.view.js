
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

        // ! Y DAFU can't I find an event that reliably runs after external scripts ?
        const html = this.private.html;
        setTimeout(function () {
            sceneDiv.innerHTML = html;
        }, 1000);
        

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
                html: ''
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

            console.log('data collected', this.private.objectArray);
        },

        //hide: function () {
        //    this.private.show = false;
        //},

        // building the a-scene in an iframe as arjs doesn't accept shutting off the camera when leaving the view
        buildTemplate: async function () {

            //let entities = '';
            //if (this.private.objectArray.length > 0) {
            //    for (let i = 0; i < 5; i++) {
            //        const entity = this.private.objectArray[i];
            //        const entityHtml = `<a-text look-at="[gps-camera]" value="${entity.value}" scale="${entity.scale}" position="latitude: ${entity.position.lat}; longitude: ${entity.position.lon}"></a-text>`;
            //        entities += entityHtml;
            //    }
            //    console.log('constructed entities', entities);
            //} else
            //    console.log(this.private.objectArray.Length);
            

            
            const text = '<a-text value="This content will always face you." look-at="[gps-camera]" scale="120 120 120" gps-entity-place="latitude: 59.292623; longitude: 18.05056;"></a-text>';
            

            this.private.html = `
<div>
    <a-scene id="scene" vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; debugUIEnabled: false;">

        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>

        ${text}

        <a-camera gps-camera rotation-reader>
            <a-cursor></a-cursor>
        </a-camera>

    </a-scene>
</div>
`;

            console.log('template built', this.private.html);


        }
    },
    watch: {
        'private.objectArray': async function () {
            this.buildTemplate();
        }
    },
  
    template: `
<div id="sceneview">

</div>`
});

