var coordinates = AFRAME.utils.coordinates;
AFRAME.registerComponent('speech-bubble', {
    schema: {
        text: {
            default: ''
        },
        position: {
            type: 'vec3'
        },
        rotation: {
            type: 'vec3'
        },
        size: {
            type: 'vec3',
            default: {x: 1, y: 1, z: 0.01}
        }
    },
    update: function (oldData) {
        console.log('creating speech bubble');
        const rowLength = 20; // TODO: parameter?
        const speechBubbleImgPath = 'assets/images/Speech_bubble.svg'; // TODO: parameter?
        const fontPath = 'assets/adrip1.ttf'; // TODO: config?
        var loader = new THREE.ImageBitmapLoader();

        const position = this.data.position;
        const rotation = this.data.rotation;
        const size = this.data.size;
        let elm = this.el;

        // Example text
        // value = 'Detta är ett test av en halvlång text för att se hur man hanterar automatisk radbrytning';

        // splices string on first space after start value
        String.prototype.wordSplice = function (start, delCount, newSubStr) {
            const actualStart = this.indexOf(' ', start) + 1; // +1 as we want the split after the space in this case
            return this.slice(0, actualStart) + newSubStr + this.slice(actualStart + Math.abs(delCount));
        };

        if (this.data.text.length > rowLength) {
            const rows = parseInt(this.data.text.length / rowLength);

            for (var i = 1; i < rows; i++) {
                this.data.text = this.data.text.wordSplice((rowLength * i), 0, '\n');
            }
        }

        loader.load(speechBubbleImgPath,
            function (bitmap) {
                var texture = new THREE.CanvasTexture(bitmap);
                var material = new THREE.MeshBasicMaterial({ map: texture });

                const geometry = new THREE.BoxBufferGeometry(size.x, size.y, size.z);

                let cube = new THREE.Mesh(geometry, material);
                cube.position.set(position.x, position.y, position.z);
                cube.rotation.set(rotation.x, rotation.y, rotation.z);

                elm.setObject3D('bubble', cube);

                loader.load( fontPath, function ( json ) {

					font = new THREE.Font( json );
					createTextObj(text, position, rotation, size, font);

				} );
            },
            undefined,
            (err) => {
                console.error('Error!', err);
            });
    },
    remove: function () {
        this.el.removeObject3D('text');
        this.el.removeObject3D('bubble');
    }
});


const createTextObj = function(text, position, rotation, size, font) {

    const textGeometry = new THREE.TextBufferGeometry( text, {

        font: font,
        size: size,

        // TODO: MAGIC NUMBERS! Config?
        height: size/3,
        curveSegments: 4, 
        bevelThickness: 2,
        bevelSize: 1.5,
        bevelEnabled: true

    } );

    textGeometry.computeBoundingBox();
    textGeometry.computeVertexNormals();

    var centerOffset = - 0.5 * ( textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x );

    textMesh1 = new THREE.Mesh( textGeometry, material );

    textMesh1.position.x = centerOffset;
    textMesh1.position.y = position.y;
    textMesh1.position.z = position.z;

    textMesh1.rotation.x = rotation.x;
    textMesh1.rotation.y = rotation.y;

    elm.setObject3D('text', textMesh1);
}
