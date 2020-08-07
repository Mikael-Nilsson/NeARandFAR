Vue.config.ignoredElements = [
    'a-scene',
    'a-entity',
    'a-camera',
    'a-box',
    'a-sky',
    'a-assets',
    'a-marker',
    'a-marker-camera',
    'a-text'
]

console.log('initializing app');

const app = new Vue({
    router: new VueRouter({routes}),
    el: '#app',
    mounted: async function() {
      console.log('app started:', startView.started);
      const pos = await getLocation();
      global.position = pos.coords;
      this.loaded = true;
      console.log('lat when mounted', global.position.latitude);
    },
    computed: {
    },
    methods: {
      startSession: function() {
        this.sessionActive = true;
        console.log('lat when starting session', global.position.latitude, this.loaded);
        this.$router.push({name: 'dashcam'});
      }
    },
    data: function() {
      return {
        position: {},
        sessionActive: false,
        loaded: false
      };
    },
    template: `
      <div>
        <template v-if="loaded && sessionActive">
          <router-view name="up" style="height: 100px;"></router-view>
          <router-view name="down"></router-view>
          <!--<camview v-bind:position="position"></camview>-->
        </template>
        <template v-if="!sessionActive">
          <loginview v-on:start="startSession()"></loginview>
        </template>
        <template v-if="!loaded">
          <div>loading</div>
        </template>
      </div>
    `
  });
 
 
  