const camView = Vue.component('camview', {
    name: 'camview',
    mounted: function () {
        console.log('camview mounted');
        this.toggleScene();
    },
    beforeDestroy: function () {
        this.toggleScene();
    },
    data: function () {
        return {
            shared: globalState
        }
    },
    methods: {
        toggleScene: function () {
            console.log('creating iframe');
            let frameDiv = document.getElementById('frameDiv');
            const frame = `<iframe id="frame" src="/#/scene" style="width:100%; height:50%; position: absolute; top: 0%;"></iframe>`;

            if (this.shared.camActive) {
                frameDiv.innerHTML = frame;                
            }
            else {
                frameDiv.innerHTML = '';
            }

        }
    },
    template: `<div id="frameDiv"></div>`

});