const events = {
    clickAction: function () {
        console.log('registering clikker');

        AFRAME.registerComponent('click-action', {

            schema: {
                callback: {default: null}
            },

            init: function () {
                let data = this.data;
                let callbackfn = this.data.callback;
                let el = this.el;

                el.addEventListener('click', function (evt) {
                    callbackfn(el, data);
                });
            }
        });
    },
    startConversationEvent: function() {
        console.log('registering conversationstarter');

        AFRAME.registerComponent('start-conversation', {

            schema: {
                id: {default: -1}
            },

            init: function () {
                let data = this.data;
                let elm = this.el;

                elm.addEventListener('click', function (evt) {
                    
                    console.log('starting conversation ', data.id);
                    conversationService.activeNPC = data.id;
                
                });
            }
        });
    }
}