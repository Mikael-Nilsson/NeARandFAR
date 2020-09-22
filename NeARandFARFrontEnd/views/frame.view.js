const frameView = Vue.component('frameview', {
    name: 'frameview',

    data: function () {
        return {
            shared: globalState,
            externalLibraries: [
                'https://aframe.io/releases/1.0.4/aframe.min.js',
                'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js',

            ],
            externalLibraryPlugins: [
                'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.slim.js',
                'https://unpkg.com/aframe-look-at-component@1.0.0/dist/aframe-look-at-component.min.js',
                //'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js',
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
        renderChildren: function () {
            // ! I guess we will need to get the AFrame-script links here too ?
            const children = this.$slots.default;
            const head = this.$el.contentDocument.head;
            const body = this.$el.contentDocument.body;

            this.externalLibraries.forEach((source) => {
                const script = document.createElement('script');
                script.src = source;
                head.appendChild(script);
            });

            externalLibraryPlugins = this.externalLibraryPlugins;

            // ! BAD WAY !
            setTimeout(function () {

                externalLibraryPlugins.forEach((source) => {
                    const script = document.createElement('script');
                    script.src = source;
                    head.appendChild(script);
                });
            }, 100);

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


