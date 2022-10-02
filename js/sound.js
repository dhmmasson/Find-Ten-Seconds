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

}

const sound = {
    soundEffectVolume: 1,
    musicVolume: 1,
    soundEffectReverb: null,
    musicReverb: null,
    removeTile: true
}

function setUpSound() {
    //return
    sound.musicReverb = new p5.Reverb();
    sound.soundEffectReverb = new p5.Reverb();
    tenLoop.disconnect();
    tenLoop2.disconnect();
    elevenLoop.disconnect();
    elevenLoopB.disconnect();
    sevenLoop.disconnect();
    nineLoop.disconnect();

    tenLoop.pan(-.8)
    sevenLoop.pan(.8)
    nineLoop.pan(.8)

    sound.musicReverb.process(tenLoop, 3, 2);
    sound.musicReverb.process(tenLoop2, 3, 2);
    sound.musicReverb.process(elevenLoop, 3, 2);
    sound.musicReverb.process(sevenLoop, 3, 2);
    sound.musicReverb.process(nineLoop, 3, 2);

    sound.soundEffectReverb.process(elevenLoopB, 3, 2);

    sound.musicReverb.drywet(.2);
    sound.soundEffectReverb.drywet(.2);
    setVolume()


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

function playClick() {
    soundOffset = random([0.31, 2.31, 1.31, 3.31, 2.31, 1.31, 3.31])
    elevenLoopB.play(0, 1, .5, soundOffset, 1)
}

function playRemoveTile() {
    elevenLoopB.play(0, 1, .5, 10.5, 2)
}

function setVolume() {
    sound.soundEffectReverb.amp(saveDate.soundEffectVolume)
    sound.musicReverb.amp(saveDate.musicVolume)
}