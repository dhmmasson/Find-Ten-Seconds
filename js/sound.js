let tenLoop, elevenLoop, elevenLoopB, sevenLoop, nineLoop;
let hat, hat2
function loadSoundAssets() {
    soundFormats('mp3', 'ogg', 'wav');
    tenLoop = loadSound('sounds/10');
    tenLoop2 = loadSound('sounds/10');
    elevenLoop = loadSound('sounds/11');
    elevenLoopB = loadSound('sounds/11b');
    sevenLoop = loadSound('sounds/7');
    nineLoop = loadSound('sounds/9');

    hat = loadSound('sounds/hat')
    hat2 = loadSound('sounds/hat2')
}

function setUpSound() {
    //return
    const musicReverb = new p5.Reverb();
    const soundEffectReverb = new p5.Reverb();
    tenLoop.disconnect();
    tenLoop2.disconnect();
    elevenLoop.disconnect();
    elevenLoopB.disconnect();
    sevenLoop.disconnect();
    nineLoop.disconnect();

    tenLoop.pan(-.8)
    sevenLoop.pan(.8)
    nineLoop.pan(.8)

    musicReverb.process(tenLoop, 3, 2);
    musicReverb.process(tenLoop2, 3, 2);
    musicReverb.process(elevenLoop, 3, 2);
    musicReverb.process(sevenLoop, 3, 2);
    musicReverb.process(nineLoop, 3, 2);

    soundEffectReverb.process(elevenLoopB, 3, 2);

    musicReverb.drywet(.2);
    soundEffectReverb.drywet(.2);

    soundEffectReverb.amp(1)

    setTimeout(() => {
        const rate = 2
        tenLoop.loop(10, 1, 2, 0, 10);
        setInterval(() => {
            if (Math.random() < .5) {
                sevenLoop.play(0, 1, 2, 0, 7)
                sevenLoop.play(7, 1, 2, 0, 3)
            } else {
                nineLoop.play(0, 1, 2, 0, 9)
                nineLoop.play(9, 1, 2, 0, 1)
            }
        }, 10000)
        tenLoop2.loop(20, tenLoop2.rate() * 1.4, .3, 0, 10);
        elevenLoop.loop(0, elevenLoop.rate(), 2, 0, 11);
    }, 1000);
}