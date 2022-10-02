let tenLoop, elevenLoop, elevenLoopB, sevenLoop, nineLoop;
function loadSoundAssets() {
    soundFormats('mp3', 'ogg');
    tenLoop = loadSound('sounds/10');
    elevenLoop = loadSound('sounds/11');
    elevenLoopB = loadSound('sounds/11b');
    sevenLoop = loadSound('sounds/7');
    nineLoop = loadSound('sounds/9');
}

function setUpSound() {
    reverb = new p5.Reverb();
    tenLoop.disconnect();
    elevenLoop.disconnect();
    sevenLoop.disconnect();
    nineLoop.disconnect();

    reverb.process(tenLoop, 1.5, 2);
    reverb.process(elevenLoop, 1.53, 2);
    reverb.process(sevenLoop, 1.63, 2);
    reverb.process(nineLoop, 1.63, 2);

    reverb.drywet(.2);

    setTimeout(() => {
        tenLoop.loop(0, tenLoop.rate(), 3, 0, 10);
        tenLoop.loop(0, tenLoop.rate() * 1.4, 3, 0, 10);
        sevenLoop.loop(0, sevenLoop.rate(), 1, 0, 7);
        nineLoop.loop(0, nineLoop.rate(), 1, 0, 9);
        elevenLoop.loop(10, elevenLoop.rate(), 2, 0, 11);
    }, 1000);
}