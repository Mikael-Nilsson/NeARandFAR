var app = new Vue({
    el: '#app',
    template: `
        <div>
            <a-scene vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; debugUIEnabled: false;">
                <camview></camview>
            </a-scene>
            <div id="loc"></div>
        </div>
    `,
    data: () => {
        return {};
    }
});