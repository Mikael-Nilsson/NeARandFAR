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
        }
    },
    data: function() {
        return {
            pos: gpsService.position.coords,
            activeNPC: conversationService.activeNPC
        };
    },
    computed: {
        // activeNPC: function() {
        //     return conversationService.activeNPC;
        // },
        activeConversation: async function() {
            
            const activeConversation = await conversationService.getActiveConversationNode();
            console.log('getting current conversation with', this.activeNPC, activeConversation);
            return activeConversation;
        }
    },
    template: `
    <div>
        <template v-for="reply in activeConversation.replies">
            <div>{{reply.line}}</div>
        </template>

        <b>{{activeNPC}}:</b>
        <div>{{pos.latitude}}, {{pos.longitude}}</div>
        <button id="logout" v-on:click="logout()">logout</button>
    </div>
    `
});