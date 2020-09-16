const frameView = Vue.component('frameview', {
    name: 'frameview',

    data: function () {
        return {
            shared: globalState,
            externalLibraries: [
                'https://aframe.io/releases/1.0.4/aframe.min.js'
            ]
        }
    },
    render: function (create) {
        return create('iframe', {
            on: { load: this.renderChildren }
        });
    },
    updated: function () {
        console.log('frameView updated');
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



            const el = document.createElement('DIV') // we will mount or nested app to this element
            body.appendChild(el)

            const iApp = new Vue({
                name: 'iApp',
                //freezing to prevent unnessessary Reactifiation of vNodes
                data: { children: Object.freeze(children) },
                render(h) {
                    console.log('rendering in frame', this.children);
                    return h('div', this.children)
                }
            })

            iApp.$mount(el) // mount into iframe

            this.iApp = iApp // cache instance for later updatess

        }
    }

});


