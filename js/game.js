// Dimitri Masson
let board = {}
let history = []
const borderColors = ["#001219", "#E9D8A6", "#E9C46A"]


function preload() {
    loadSoundAssets()
}

function setup() {
    //Clear console between re run
    console.clear()
    //My favorite color mode
    colorMode(HSB, 300, 100, 100, 100);
    const { root, candidates } = createOntology()

    board = new Grid(6, candidates)

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
                replenishBoard()
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
    alert("GAME OVER" + board.totalScore)
}

function removeTile(tile) {
    playRemoveTile()
    tile.selected = 0
    board.tiles.delete(tile)
    board.grid[tile.i][tile.j] = null
    board.missingTiles.push(tile)
    if (board.tiles.size == 0) {
        endGame()
    }
}

//Move to grid class
function replenishBoard() {
    const tiles = board.history.map(([tile1, tile2]) => [tile1, tile2]).flat()
    let tileGained = tileGain(board.roundScore)
    while (board.missingTiles.length > 0 && tileGained > 0) {
        const tile = random(board.missingTiles)
        board.tiles.add(tile)
        board.grid[tile.i][tile.j] = tile
        tileGained--
    }
}

function removeRandomTile() {
    let tile = board.randomTile()
    let tries = 10
    while (tile.selected != 0 && --tries > 0) {
        tile = board.randomTile()
    }
    if (tries > 0) {
        removeTile(tile)
    }
}
