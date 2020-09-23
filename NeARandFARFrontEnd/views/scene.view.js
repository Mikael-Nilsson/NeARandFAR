
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
        

    },
    mounted: function () {

        console.log('mounting', this.html);

       

        
        let frame = document.getElementById('frameview');

        let sceneDiv = frame.contentDocument.getElementById('sceneview');
        console.log(sceneDiv);

        // ! Y DAFUQ ?
        const html = this.html;
        setTimeout(function () {
            sceneDiv.innerHTML = html;
        }, 1000);
        

        console.log('sceneview mounted');
        
    },
    data: function () {
        return {
            html: ''
        }       
    },
    methods: {
       
        hide: function () {
            this.private.show = false;
        },

        // building the a-scene in an iframe as arjs doesn't accept shutting off the camera when leaving the view
        buildTemplate: async function () {

            const text = '<a-text value="This content will always face you." look-at="[gps-camera]" scale="120 120 120" gps-entity-place="latitude: 59.292623; longitude: 18.05056;"></a-text>';
            

            this.html = `
<div>
    <a-scene vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
        ${text}
        <!--<a-text value="This content will always face you." look-at="[gps-camera]" scale="120 120 120" gps-entity-place="latitude: <add-your-latitude>; longitude: <add-your-longitude>;"></a-text>-->
        <a-camera gps-camera rotation-reader>
            <a-cursor></a-cursor>
        </a-camera>

    </a-scene>
</div>
`;

            console.log('template built', this.html);
            
        }
    },
  
  
    template: `<div id="sceneview"></div>`
});

