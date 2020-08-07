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
      const pos = await getLocation();
      global.position = pos.coords;
      this.loaded = true;
      console.log('lat when mounted', global.position.latitude);
    },
    computed: {
    },
    methods: {
      startSession: function() {
        console.log('lat when starting session', global.position.latitude, this.loaded);
        this.$router.push({name: 'cam'});
      }
    },
    data: function() {
      return {
        position: {},
        loaded: false
      };
    },
    computed: {
      sessionActive: function() {
        console.log('existing session', localStorage.getItem('sessionActive'));
        if(localStorage.getItem('sessionActive') === 'true')
          return true;
        else return false;
      }
    },
    template: `
      <div>
        <template v-if="loaded && sessionActive">
          <dashview class="dashboard"></dashview>
          <router-view></router-view>
          <!--<router-view name="down"></router-view>-->
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
 
 
  