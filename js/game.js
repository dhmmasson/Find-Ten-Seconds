// Dimitri Masson
let board = {}
let history = []
const borderColors = ["#001219", "#E9D8A6", "#E9C46A"]
let gameOverBanner = null

function preload() {
    loadSoundAssets()
}
const saveDate = {
    size: 10,
    soundEffectVolume: 1,
    musicVolume: 1,
    easyMode: false,
    bestScore: 1000
}

function setup() {

    let gui = new dat.GUI({ name: 'My GUI' });
    gui.useLocalStorage = true;
    gui.open()
    const boardGUI = gui.addFolder('Board')
    gui.remember(saveDate)
    boardGUI.add(saveDate, 'size', 5, 12).step(1).name("Board Size").onChange(() => { })
    boardGUI.add(saveDate, 'easyMode').name("Easy Mode").onChange(() => { })
    boardGUI.add({ reload: () => { location.reload() } }, 'reload').name("Restart Game")
    boardGUI.close()
    const soundGUI = gui.addFolder('Sound')
    soundGUI.add(saveDate, 'soundEffectVolume', 0, 1).step(0.01).onChange(setVolume).name("FX Volume")
    soundGUI.add(saveDate, 'musicVolume', 0, 1).name("Music Volume").step(0.01).onChange(setVolume)
    soundGUI.close()
    saveDate.bestScore = localStorage.getItem('highScore') || 0


    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, { dismissible: true });
    console.clear()
    gui.add({ splashScreen: () => { instances[1].open() } }, 'splashScreen').name("Splash Screen")
    if (localStorage.getItem('readSplash') != 'true') {
        instances[1].open()
        localStorage.setItem('readSplash', true)
    }
    gameOverBanner = instances[0]

    //Get buttons that have the class startGame and add a listener
    const startGameButtons = selectAll(".startGame")
    startGameButtons.forEach(e => e.mousePressed(() => {
        location.reload()
    }))


    //My favorite color mode
    colorMode(HSB, 300, 100, 100, 100);
    const { root, candidates } = createOntology()

    board = new Grid(saveDate.size, candidates)

    //Create a canvas and move its div
    createCanvas(100, 100).parent("#canvasDiv");
    //Resize it
    windowResized()
    //Some background color 
    background(51);
    userStartAudio();
    setUpSound()

    //Remove a tile every 10 seconds
    setInterval(removeRandomTile, 10000)

    //add class browser-default to all inputs
    const inputs = selectAll("input")
    inputs.forEach(e => e.addClass("browser-default"))
}

//Resize canvas to fill the div
function windowResized() {
    const size = select("#canvasDiv").size();
    let minSize = min(size.width, size.height)
    minSize = min(size.width - 6 * minSize / board.size, size.height)
    const tileSize = minSize / board.size
    resizeCanvas(minSize + 6 * tileSize, minSize);
    board.tileSize = minSize / board.size
}

//Main drawing function
function draw() {
    colorMode(RGB, 255, 255, 255, 100);
    background(color(0, 18, 25, 20));
    board.draw()
    board.drawSelection()
    board.drawScore()
}

function mouseMoved() {
    const tile = convertMouseToTile()
    if (tile) {
        selectionLogic(tile, false)
    } else {
        if (board.next) {
            board.next.hover = false
            board.next = null
        }
    }
    return false;
}
function mouseClicked() {
    const tile = convertMouseToTile()
    if (tile) {
        playClick()
        selectionLogic(tile, true)
        if (board.selection.size == 2) {
            const selection = Array.from(board.selection)
            board.history.unshift(selection)
            selection.forEach(e => removeTile(e))
            let { score } = computeScore(selection[0], selection[1])
            board.roundScore += score

            if (board.history.length >= 10) {
                board.replenishBoard()
                //Update Score
                board.totalScore += board.roundScore
                board.roundScore = 0
                //Clean History
                board.history = []
            }

            selection.push(score)
            board.selection.clear()
            board.next = null

        }
    }

    return false;
}


function selectionLogic(tile, click) {
    if (click == false && !tile.selected) {
        board.next = tile
    }
    if (click == true) {
        if (board.selection.has(tile) == false) {
            board.selection.add(tile)
            tile.selected = board.selection.size
            board.next = null
        } else {
            board.selection.delete(tile)
            tile.selected = 0
            board.next = tile //In case mobile phone without hover
        }
    }

}

function endGame() {
    saveDate.bestScore = max(saveDate.bestScore, board.totalScore + board.roundScore)
    localStorage.setItem('highScore', saveDate.bestScore)
    //Display a banner that give the high score
    const banner = select("#highScore")
    banner.html(`Game Over<br>Score: ${board.totalScore}<br>Best Score: ${saveDate.bestScore}`)
    gameOverBanner.open()

}

