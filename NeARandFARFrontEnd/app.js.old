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
  data: function () {
    return {
      private: {
        loaded: false,
        sessionActive: true
      },
      shared: globalState
    };
  },
  created: function () {
    // Setting up log system



    //console.log('starting app...');
    this.$router.push('/app');
  },
  mounted: async function () {
    // registering events
    events.clickAction();
    events.startConversationEvent();

    //const pos = await gpsService.getLocation();
    await this.getObjects();
    //this.shared.position = pos.coords;
    this.private.loaded = true;
    //console.log('lat when mounted', globalState.position.latitude);


  },
  methods: {
    startSession: function () {
      //console.log('Starting session, lat: ', globalState.position.latitude, this.private.loaded);
      this.private.sessionActive = true;
      //this.$router.push({ path: '/cam' });


    },
    getObjects: async function () {
      // TODO: Rewrite using Rxjs
      const objects = await assetService.getData();
      // console.log('objects', objects);
      console.log('objects', objects);

      // Putting objects in object list
      this.shared.objectArray = objects.map(p => {
        return {
          geometry: p.geometry,
          value: p.value,
          scale: p.scale,
          position: p.position,
          entityPos: `latitude: ${p.position.lat}; longitude: ${p.position.lon};`,
          conversation: `id: ${p.conversationId}`,
          speechBubble: `size:2.5 1 0.01; text:${p.value};`
        };
      });

      //const NPCs = await NPCservice.getNPCs(null, gpsService.position);
      //console.log('nearby npcs found', NPCs);
      // let objects = [];

      //for (let i = 0; i < NPCs.length; i++) {
      //    const conversation = await conversationService.getConversation(NPCs[i].conversationStart);
      //    console.log('conversation collected', conversation);

      //    const npcObject = {
      //        geometry: NPCs[i].geometry,
      //        value: conversation.line,
      //        scale: NPCs[i].scale,
      //        position: NPCs[i].position,
      //        entityPos: `latitude: ${NPCs[i].position.lat}; longitude: ${NPCs[i].position.lon}`,
      //        conversation: `id: ${NPCs[i].conversationStart}`,
      //        speechBubble: `size:2.5 1 0.01; text:${conversation.line};`
      //    };


      //    this.private.objectArray.push(npcObject);
      //}

      if (this.shared.position) {
        this.shared.objectArray.concat(this.compass());
      }

      console.log('data collected', this.shared.objectArray);
    },

    compass: function () {
      console.log('adding compass at ', this.shared.position.latitude, this.shared.position.longitude);
      return [
        {
          geometry: 'text',
          scale: '20 20 20',
          value: 'north',
          position: {
            lat: this.shared.position.latitude + 0.001,
            lon: this.shared.position.longitude,
          }
        },
        {
          geometry: 'text',
          scale: '20 20 20',
          value: 'south',
          position: {
            lat: this.shared.position.latitude - 0.001,
            lon: this.shared.position.longitude,
          }
        },
        {
          geometry: 'text',
          scale: '20 20 20',
          value: 'east',
          position: {
            lat: this.shared.position.latitude,
            lon: this.shared.position.longitude + 0.001,
          }
        },
        {
          geometry: 'text',
          scale: '20 20 20',
          value: 'west',
          position: {
            lat: this.shared.position.latitude,
            lon: this.shared.position.longitude - 0.001,
          }
        },

      ];
    },

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
      <router-view></router-view>
    </template>
    <template v-else>
        
    </template>
    </div>
    `
});


