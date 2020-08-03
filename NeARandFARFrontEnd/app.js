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

const app = new Vue({
    el: '#app',
    mounted: async function() {
      const pos = await getLocation();
      this.position = pos.coords;
      console.log('pos', JSON.stringify(this.position));
      console.log('lat', this.position.latitude);
    },
    components: {
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
        test: 'test'
      };
    },
    template: `
      <div>
       <template v-if="loaded">
          <camview v-bind:position="position"></camview>
        </template>
        <template v-if="!loaded">
          <div>loading</div>
        </template>
      </div>
    `
  });
 
 
  