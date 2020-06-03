var app = new Vue({
    el: '#app',
    template: `
        <div>
            <a-scene vr-mode-ui="enabled: false" embedded
            arjs="sourceType: webcam; debugUIEnabled: false;">
                <a-text value="This content will always face you." look-at="[camera]"
                scale="60 60 60" gps-entity-place="latitude: 59.2926; longitude: 18.0505;"></a-text>

                <a-text value="Syns det här?" look-at="[camera]" scale="1000 1000 1000" gps-entity-place="latitude: 59.236988; longitude: 17.978851;"></a-text>
                <a-text value="Hej Tommy!" look-at="[camera]" scale="100 100 100" gps-entity-place="latitude: 59.188992; longitude: 17.609069;"></a-text>
                <a-camera gps-camera rotation-reader> </a-camera>
            </a-scene>
            <div id="loc"></div>
        </div>
    `,
    data: async () => {
        const position = await getLocation();
        console.log('position on new site: ', position);
        return {};
    }
});