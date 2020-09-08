const bubble = require('../entities/speechbubble');
const AFRAME = require('aframe');

function testCalculateFontSize() {
    const text = 'Detta är ett test av en halvlång text för att se hur man hanterar automatisk radbrytning';

    const textArray = formatText(text).split('\n');

    signSize = { x: 2.5, y: 1 }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.canvas.width = 1000;
    context.canvas.height = 400;

    let fontName = 'arial';

    const fontSize = calculateFontSize(textArray, signSize, context, fontName);
    console.assert(fontSize, { msg: 'no value' })
}
