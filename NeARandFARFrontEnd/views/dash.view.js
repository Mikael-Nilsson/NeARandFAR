const dashView = Vue.component('dashview', {
    mounted: function() {
        console.log('mounting dashboard');
    },
    methods: {
        logout: function() {
            console.log('logging out');
            localStorage.removeItem('sessionActive');
            localStorage.removeItem('apiKey');
            this.$router.push({path: '/'});
        },
        updateActiveConversation: async function() {
            this.activeConversation = await conversationService.getActiveConversationNode();
        },
        checkActive: function() {
            console.log(this.shared.activeNPC);
        }
    },
    data: function() {
        return {
            private: {
                activeConversation: {}
            },
            shared: globalState
        }
        
    },
    watch: {
        'shared.activeNPC': async function() {
            console.log('changed active NPC');
            this.private.activeConversation = await conversationService.getActiveConversationNode();
        }
    },
    computed: {
        
    },
    template: `
    <div>
        <template v-if="private.activeConversation">
            <template v-for="reply in private.activeConversation.replies">
                <button>{{reply.line}}</button>
            </template>
        </template>

        <b>{{shared.activeNPC}}:</b>
        <div>{{shared.position.latitude}}, {{shared.position.longitude}}</div>
        <button id="logout" v-on:click="logout()">logout</button>
        </div>
    `
});