Vue.config.ignoredElements = [
  'a-scene',
  'a-entity',
  'a-camera',
  'a-box',
  'a-sky',
  'a-assets',
  'a-marker',
  'a-marker-camera',
  'a-text',
  'a-cursor',
  'a-sphere',
  'a-image',
  'speech-bubble',
  'a-cone'
]

console.log('initializing app');

const app = new Vue({
  router: new VueRouter({ routes }),
  el: '#app',
  created: function () {

  },
  mounted: async function () {
    // registering events
    events.clickAction();
    events.startConversationEvent();


    const pos = await gpsService.getLocation();
    globalState.position = pos.coords;
    this.loaded = true;
    console.log('lat when mounted', globalState.position.latitude);

    this.sessionActive = localStorage.getItem('sessionActive');

    if (this.sessionActive)
      this.$router.push({ path: '/cam' });

  },
  methods: {
    startSession: function () {
      console.log('Starting session, lat: ', globalState.position.latitude, this.loaded);
      this.sessionActive = true;
      this.$router.push({ path: '/cam' });
    },
  },
  data: function () {
    return {
      position: {},
      loaded: false,
      sessionActive: true,
    };
  },
  computed: {
    // sessionActive: function() {
    //   let sess = localStorage.getItem('sessionActive');
    //   console.log('existing session', sess);

    //   if(sess === 'true')
    //     return true;
    //   else return false;
    // }
  },
  // TODO: Make this not show login until session is decidedly not active. Maybe a nice spinner or smth?
  template: `
      <div>
        <template v-if="!loaded">
          <div>loading...</div>
        </template>
        <template v-else>
          <template v-if="!sessionActive">
            <loginview v-on:start="startSession()"></loginview>
          </template>
          <template v-else>
            <dashview class="dashboard"></dashview>
            <router-view></router-view>
          </template>
        </template>
      </div>
    `
});


