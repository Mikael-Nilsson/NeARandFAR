const frameView = Vue.component('frameview', {
    name: 'frameview',
    created: function () {
        console.log('frameview created');

    },
    mounted: function () {

    },

    data: function () {
        return {
            shared: globalState,
            externalLibraries: [
                'https://aframe.io/releases/1.0.4/aframe.min.js',

            ],
            externalLibraryPlugins: [
                //'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js',
                'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.slim.js',
                'https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js',
                'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js',
                'https://unpkg.com/aframe-event-set-component@3.0.3/dist/aframe-event-set-component.min.js',
            ]
        }
    },
    render: function (create) {
        return create('iframe', {
            attrs: { id: 'frameview' },
            on: { load: this.renderChildren }
        });
    },
    methods: {
        renderChildren: async function () {
            // ! I guess we will need to get the AFrame-script links here too ?
            const children = this.$slots.default;
            const contentDocument = this.$el.contentDocument;
            const head = contentDocument.head;
            const body = contentDocument.body;

            //for (let i = 0; i < this.externalLibraries.Length; i++) {
            this.externalLibraries.forEach((source) => {
                //const source = this.externalLibraries[i];
                const script = contentDocument.createElement('script');
                script.src = source;
                head.appendChild(script);
            });

            externalLibraryPlugins = this.externalLibraryPlugins;

            // ! BAD WAY ! HOW DO WE GUARANTEE THAT THESE ARE RUN AFTER AFRAME ?
            setTimeout(function () {

                //for (let i = 0; i < this.externalLibraryPlugins.Length; i++) {
                externalLibraryPlugins.forEach((source) => {
                    //const source = this.externalLibraryPlugins[i];
                    const script = contentDocument.createElement('SCRIPT');
                    script.src = source;
                    head.appendChild(script);
                });
            }, 800);


            const el = document.createElement('DIV') // we will mount or nested app to this element
            body.appendChild(el)

            const iApp = new Vue({
                name: 'iApp',
                //freezing to prevent unnessessary Reactifiation of vNodes
                data: { children: Object.freeze(children) },
                render(h) {
                    return h('div', this.children)
                }
            })

            iApp.$mount(el) // mount into iframe

            this.iApp = iApp // cache instance for later updatess

        }
    }

});


