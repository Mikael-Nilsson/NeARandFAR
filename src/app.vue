<template>
    <div>
        <a-scene vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; debugUIEnabled: false;">
            <!-- <camview></camview> -->
        </a-scene>
        <dashboard></dashboard>
    </div>
</template>

<script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>

<script>
    import * as aframe from 'aframe';
    // import camview from './views/camview.view.vue';
    import dashboard from './dashboard.vue';

    export default {
        name: 'app',
        components: {
            dashboard,
            camview
        }
    };
</script>

