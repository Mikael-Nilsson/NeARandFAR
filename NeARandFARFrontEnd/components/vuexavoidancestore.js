// TODO: IMPLEMENT FKING VUEX, YOU CLOD!
console.log('trying to avoid vuex');

let globalState = {
    position: {latitude: null, longitude: null},
    activeNPC: -1,
    camActive: false,
    on: false,
    follow: true,
    log: (msg) => {
        console.log(msg);
        if (!this.channel)
            this.channel = new BroadcastChannel('log-channel');
        this.channel.postMessage(msg);
    }
};
