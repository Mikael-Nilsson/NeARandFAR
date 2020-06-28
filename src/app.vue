<template>
    <div>
        <a-scene vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; debugUIEnabled: false;">
            <a-camera gps-camera rotation-reader> </a-camera>
            <a-text value="This content will always face you." look-at="[gps-camera]" scale="120 120 120" gps-entity-place="latitude: 59.29; longitude: 18.055;"></a-text>
            <!-- <a-box gps-entity-place="latitude: 59.291; longitude: 18.054;" rotation="0 45 0" look-at="[gps-camera]" color="#4CC3D9"></a-box> -->
        </a-scene>
        
    </div>

</template>

<script>

    import * as gps from './models/gps';

const scriptReferences = [
    "https://aframe.io/releases/master/aframe.min.js",
    "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js",
    "https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js",
];

    export default {    
        name: 'app',
        created: async () => {   
            scriptReferences.forEach(url => {
                let scriptElm = document.createElement('script');
                scriptElm.setAttribute('src', url);
                document.head.appendChild(scriptElm);
            });
            
            gps.getLocation();
        }
    };
</script>

