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
      this.position = pos.coords;
      console.log('pos', JSON.stringify(this.position));
      console.log('lat', this.position.latitude);
    },
    computed: {
      loaded: function() {
        const loaded = this.position.latitude ? true : false;
        console.log('app loaded', loaded);
        console.log('pos:', this.position);
        return loaded;
      }
    },
    data: function() {
      return {
        position: {},
        sessionActive: false
      };
    },
    template: `
      <div>
        <template v-if="loaded && sessionActive">
          <router-view name="up"></router-view>
          <router-view name="down"></router-view>
          <!--<camview v-bind:position="position"></camview>-->
        </template>
        <template v-if="!sessionActive">         
          <loginview v-on:start="sessionActive = true"></loginview>
        </template>
        <template v-if="!loaded">
          <div>loading</div>
        </template>
      </div>
    `
  });
 
 
  