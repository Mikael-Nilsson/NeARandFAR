<template>
  <div>
    <p>test</p>
    <!-- <a-text
      value="This content will always face you."
      look-at="[camera]"
      scale="60 60 60"
      gps-entity-place="latitude: 59.2927; longitude: 18.0505;"
    ></a-text> -->

    <!--<a-text value="Syns det här?" look-at="[camera]" scale="500 5000 500" gps-entity-place="latitude: 59.292314; longitude: 18.050335;"></a-text>-->
    <!--<a-text value="Hej Tommy!" look-at="[camera]" scale="100 100 100" gps-entity-place="latitude: 59.188992; longitude: 17.609069;"></a-text>-->
    <a-camera gps-camera rotation-reader></a-camera>
  </div>
</template>

<script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
<script src="https://raw.githack.com/AR-js-org/AR.js/3.1.0/aframe/build/aframe-ar-nft.js"></script>
<!-- <script src="../components/camview.component.js"></script>-->

<script> 
  import * as aframe from 'aframe';
  import * as aframeAr from 'aframe-ar';
  import * as gps from "../models/gps.js";

    export default {
        name: "camview",
        components: {
          aframe,
          aframeAr,
          gps
        },
        async data() {
            console.log("1. calling getLocation from app");

            const position = await gps.getLocation();
            console.log("4. position on new site: ", position);
            console.log('test');

            return {
              position: position
            };
        },
        methods: {}
    };
</script>
