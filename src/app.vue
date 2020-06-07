<template>
    <div>
        <a-scene> <!-- vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; debugUIEnabled: false;">-->
            <camview></camview>
        </a-scene>
        <dashboard></dashboard>
    </div>
</template>

<script>
    // import aframe from 'aframe';
    import camview from './camview.vue';
    import dashboard from './dashboard.vue';

    export default {
        name: 'app',
        components: {
            dashboard,
            camview
        }
    };
</script>

