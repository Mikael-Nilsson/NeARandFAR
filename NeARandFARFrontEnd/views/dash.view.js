const dashView = Vue.component('dashview', {
  mounted: function () {
    console.log('mounting dashboard');
  },
  methods: {
    logout: function () {
      console.log('logging out');
      localStorage.removeItem('sessionActive');
      localStorage.removeItem('apiKey');
      this.$router.push({ path: '/' });
    },
    checkActive: function () {
      console.log(this.shared.activeNPC);
    },
    updateConversation: async function (reply) {

      console.log('updating active conversation with', reply);
      conversationService.updateActiveConversationNode(this.shared.activeNPC, reply.next[0]); // TODO: add reply.relationship if any
      console.log(conversationService.currentNodes[0]);
    },
    toggleMap: async function () {
      this.shared.camActive = !this.shared.camActive;
      console.log('camActive in dash', this.shared.camActive);
      this.private.gotoView = this.private.gotoView == 'cam' ? 'map' : 'cam';
    }
  },
  data: function () {
    return {
      private: {
        activeConversation: {},
        gotoView: 'cam'
      },
      shared: globalState
    }

  },
  watch: {
    //'shared.activeNPC': async function() {
    //    const currentNode = await conversationService.getCurrentConversationNode();
    //    this.private.activeConversation = conversationService.getConversation(currentNode.id);
    //    console.log('changed active NPC', this.private.activeConversation, currentNode);
    //}
  },
  computed: {

  },
  template: `
    <div>
      <template v-if="private.activeConversation">
        <template v-for="reply in private.activeConversation.replies">
          <button v-on:click="updateConversation(reply)">{{reply.line}}</button>
        </template>
      </template>

      <button id="showmap" v-on:click="toggleMap()">{{private.gotoView}}</button>
      <button id="showScene" v-on:click="shared.follow = !shared.follow">position: {{shared.follow ? 'on' : 'off'}}</button>
      <b>{{shared.activeNPC}}:</b>
      <div>{{shared.position.latitude}}, {{shared.position.longitude}}</div>
      </div>
    `
});


