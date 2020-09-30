const logView = Vue.component('logView', {
    created: function () {
        const channel = new BroadcastChannel('log-channel');

        channel.onmessage = function (event) {
            console.log('log:', event.data);
            let logDiv = document.getElementById('logDiv');

            let log = document.createElement('p');
            log.innerHTML = event.data;
            logDiv.appendChild(log);


        };


    },

    template: `
    <div id="logDiv">
        test
    </div>
`
});