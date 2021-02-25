
const sceneView = Vue.component('sceneview', {
  name: 'sceneview',
  created: async function () {
    console.log('position in scene.view', this.shared.position.latitude, this.shared.position.longitude);

    if (!AFRAME.components["cursor-listener"]) {
      AFRAME.registerComponent('cursor-listener', {
        init: function () { }
      });
    }

    this.buildTemplate();
    this.renderObjects();

  },
  mounted: function () {

    let frame = document.getElementById('frameview');

    let sceneDiv = frame.contentDocument.getElementById('sceneview');
    console.log(sceneDiv);

    // ! Y DAFU can't I find an event that reliably runs after external scripts ? THIS WON'T WORK FOR REAL !
    const scene = this.private.scene;
    const listenForPosition = this.listenForPosition;
    setTimeout(function () {
      sceneDiv.appendChild(scene);
      listenForPosition();
    }, 1500);

    console.log('sceneview mounted');

  },
  update: async function () {
    console.log('sceneview beforeupdate');
  },
  data: function () {
    return {
      private: {
        loadingState: true,
        compassPin: {
          pos: `latitude: shared.position.latitude; longitude: shared.position.latitude;`
        },
        show: true,
        html: '',
        scene: null
      },
      shared: globalState
    }
  },
  methods: {
    listenForPosition: function () {
      let frame = document.getElementById('frameview');
      const contentDocument = frame.contentDocument;
      let scene = contentDocument.getElementById('camera');
      scene.addEventListener('gps-camera-update-positon', function (event) {
        console.log('position in scene', event);
      });
    },

    // building the a-scene in an iframe as arjs doesn't accept shutting off the camera when leaving the view
    buildTemplate: async function () {

      let frame = document.getElementById('frameview');
      const contentDocument = frame.contentDocument;

      // Set up scene
      this.private.scene = contentDocument.createElement('a-scene');
      this.private.scene.setAttribute('id', 'scene');
      this.private.scene.setAttribute('vr-mode-ui', 'enabled');
      this.private.scene.setAttribute('embedded', 'true');
      this.private.scene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false');

      // For some wicked reason I can't create the camera by createElement
      let innerHtml = `
        <a-camera id="camera" gps-camera rotation-reader>
          <a-cursor>
          </a-cursor>
        </a-camera>
      `;
      this.private.scene.innerHTML = innerHtml;

      // dev box -> Remove this later
      console.log('creating box');
      let box = contentDocument.createElement('a-box');
      this.private.scene.appendChild(box);
      //box.setAttribute('position', '1 0.5 -3');
      box.setAttribute('position', { x: 1, y: 0.5, z: -3 });
      box.setAttribute('rotation', '0 45 0');
      box.setAttribute('color', '#4CC300');

    },
    renderObjects: async function () {
      console.log('rendering', this.shared.objectArray.length, 'objects');
      const contentDocument = document.getElementById('frameview').contentDocument;

      // Entities
      //if (this.shared.objectArray.length > 0) {
      for (let i = 0; i < this.shared.objectArray.length; i++) {
        const obj = this.shared.objectArray[i];
        console.log('adding object', obj.value, obj.position);

        let entity = contentDocument.createElement('a-text'); // TODO: Fix for other objects
        this.private.scene.appendChild(entity);
        entity.setAttribute('look-at', '[gps-camera]');
        entity.setAttribute('value', obj.value);
        entity.setAttribute('gps-entity-place', `latitude: ${obj.position.lat}; longitude: ${obj.position.lon}`);
        entity.setAttribute('scale', '80 80 80');
        entity.setAttribute('class', 'conversation');
        console.log(entity);

      }
      //}
    }
  },
  watch: {
    'shared.objectArray': async function () {
      //this.buildTemplate();
      this.renderObjects();
    }
  },

  template: `
<div id="sceneview">

</div>`
});

