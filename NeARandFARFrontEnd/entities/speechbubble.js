
var coordinates = AFRAME.utils.coordinates;
AFRAME.registerComponent('speech-bubble', {
    schema: {
        text: {
            default: ''
        },
        position: {
            type: 'vec3',
            default: {x: 0, y: 0, z: 0}
        },
        rotation: {
            type: 'vec3'
        },
        size: {
            type: 'vec3',
            default: { x: 1, y: 1, z: 0.02 } // TODO: Set font as parameter and calculate sign size
        }
    },
    update: function (oldData) {
        console.log('creating speech bubble');
        const speechBubbleImgPath = 'assets/images/Speech_bubble.svg'; // TODO: parameter?
        // const fontPath = 'assets/a_dripping_marker_Regular.json'; // TODO: config?
        const bitmapLoader = new THREE.ImageBitmapLoader();

        let group = new THREE.Group();
        try{
            group.position.set(this.data.position.x, this.data.position.y, this.data.position.z);
        } catch(e) {
            console.error(e);
            console.log(this.data);
        }

        this.el.setObject3D('speechbubble', group);

        // const position = this.data.position;
        // const rotation = this.data.rotation;
        const size = this.data.size;

        let text = formatText(this.data.text);
        const textObj = createTextObj(text, size);
        group.add(textObj);

        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

        const bubble = createSpeechBubble(size);
        group.add(bubble);

        // cube.position.set(0,0,-0.1);

        // elm.setObject3D('bubble', cube);

    },
    remove: function () {
        this.el.removeObject3D(group);
    }
});

const createSpeechBubble = function(size) {
    let group = new THREE.Group();
    const material = new THREE.MeshPhongMaterial({
        color: 0x222222,
        opacity: 0.5,
        transparent: true,
    });

    const geometry = new THREE.BoxBufferGeometry(size.x, size.y, size.z);
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();
    let cube = new THREE.Mesh(geometry, material);
    
    group.add(cube);


    // Calculate position of cone
    // const segments = 32;
    // const height = 1;
    // const radius = 1; // ! This might be problematic as we essentially want it flat

    // const coneGeo = new THREE.ConeGeometry( 1, height, segments, 1, true, 0, 0.9);
    // // coneGeo.position.set(0, -(size.y/2), 0);
    // var cone = new THREE.Mesh( coneGeo, material );
    // cone.position.set(0, -(size.y/2), 0);
    // cone.rotation.set(0,20,90);
    // group.add(cone);

    return group;

};

const formatText = function (text) {
    const rowLength = 20; // TODO: parameter?

    // Example text
    // value = 'Detta är ett test av en halvlång text för att se hur man hanterar automatisk radbrytning';

    // splices string on first space after start value
    String.prototype.wordSplice = function (start, delCount, newSubStr) {
        const actualStart = this.indexOf(' ', start) + 1; // +1 as we want the split after the space in this case
        return this.slice(0, actualStart) + newSubStr + this.slice(actualStart + Math.abs(delCount));
    };

    if (text.length > rowLength) {
        const rows = parseInt(text.length / rowLength);

        for (var i = 1; i < rows; i++) {
            text = text.wordSplice((rowLength * i), 0, '\n');
        }
    }

    return text;a
};

// Returns a fontsize given the test, the size of the sign and the font
const calculateFontSize = function(textArray, signSize, context, fontName) {
    
    const longestLine = textArray.reduce((largest, current)=> {
        console.log(current, current.length, largest.length)
        if(current.length > largest.length) return current;
        else return largest;
    });

    let fontSize = 1000;
    let done = true;
    const maxWidth = signSize.x * 400;
    
    do {

        font = `${fontSize}px ${fontName}`;

        context.font = font;
        width = context.measureText(longestLine).width;

        if(width > maxWidth) {
            fontSize = Math.ceil(fontSize / 2);
            done = false;
        } else if( width < (maxWidth - width/2 )) {
            fontSize = Math.ceil(fontSize + fontSize/2);
            done = false;
        } else {
            // We look for a smaller increase that will put us under maxWidth
            let step = fontSize;
            let newSize = fontSize;
            let oldSize = fontSize;
            let newSizeFound = false;
            while(Math.ceil(newSize/2) > 2 && !newSizeFound) {
                oldSize = newSize;
                step = Math.ceil(step /2);
                newSize = fontSize + step;
                font = `${newSize}px ${fontName}`;

                context.font = font;
                width = context.measureText(longestLine).width;
                if(width < maxWidth) {
                    fontSize = newSize;
                    done = true;
                    newSizeFound = true;
                }
            }
        }

    } while(!done); // TODO: MAGIC NUMBER! config?

    formattedWidth = Math.ceil(width) + "px";
    console.log('total length:', formattedWidth, 'fontSize', fontSize);
    
    return fontSize;
};

const createTextObj = function (text, size) {

    const signWidth = size.x;
    const signHeight = size.y;
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.canvas.width = size.x*400;
    context.canvas.height = size.y*400;
    
    let fontName = 'arial';
    const fontSize = calculateFontSize(text.split('\n'), size, context, fontName);
    // const fontSize = 61; // Optimal result
    context.font = `${fontSize}px ${fontName}`; // TODO: get font from elsewhere, eg ttf file

    // Making array of multiline text
    text = text.split('\n');

    let y = fontSize;
    context.fillStyle = 'white';
    // context.strokeStyle = 'black';

    // context.font = 'a dripping marker';
    text.forEach(line => {
        context.fillText(line, 0, y);
        
        // context.strokeText(line, 0, y);
        y += fontSize;
    });

    // canvas contents will be used for a texture
    const texture = new THREE.CanvasTexture(canvas);
    var material = new THREE.MeshBasicMaterial({ map: texture });

    const textGeometry = new THREE.BoxBufferGeometry(signWidth, signHeight, 0.01);

    // textGeometry.computeBoundingBox();
    // textGeometry.computeVertexNormals();

    let textCube = new THREE.Mesh(textGeometry, material);

    textCube.position.set(0, 0, 0);

    return textCube;
};


