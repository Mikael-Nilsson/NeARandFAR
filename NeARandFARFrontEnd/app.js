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
        this.shared.position = pos.coords;
        this.private.loaded = true;
        console.log('lat when mounted', globalState.position.latitude);


    },
    methods: {
        startSession: function () {
            console.log('Starting session, lat: ', globalState.position.latitude, this.private.loaded);
            this.private.sessionActive = true;
            //this.$router.push({ path: '/cam' });


        }
       
  },
  data: function () {
      return {
            private: {
                loaded: false,
                sessionActive: true,

          },
          shared: globalState
    };
  },
  computed: {
      view: function () {
          
      }
  },
  // TODO: Maybe a nice spinner or smth?
  template: `
      <div>
        <template v-if="!private.loaded">
          <div>loading...</div>
        </template>
        <template v-else>
            <template v-if="shared.camActive">
                <frameview>
                    <sceneview />      
                </frameview>
            </template>
            <template v-else>
                <mapview />
            </template>
          <dashview class="dashboard"></dashview>
        </template>
      </div>
    `
});


