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
    console.log(candidates)
    board = new Grid(10, candidates)
    console.log(board)
    //Create a canvas and move its div
    createCanvas(100, 100)
        .parent("#canvasDiv");
    //Resize it
    windowResized()
    //Some background color 
    background(51);
    userStartAudio();
    setUpSound()
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
    background("#001219");
    board.draw()
    board.drawSelection()

    if (board.selection.size == 1 && board.next) {
        const offset = { x: board.size * board.tileSize + 3 * board.tileSize, y: board.tileSize }
        const selection = Array.from(board.selection)
        selection.push(board.next)
        let keywords = Array.from(selection[0].keywords).filter(e => e.score).filter(e => selection[1].keywords.has(e)).map(e => e.name)

        fill("#E9D8A6")
        textSize(board.tileSize / 4);
        textAlign(LEFT, TOP);
        text(keywords.join(", "), offset.x, offset.y, board.tileSize * 2, board.tileSize)
    }
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
        selectionLogic(tile, true)
        if (board.selection.size == 2) {
            const selection = Array.from(board.selection)
            history.push(selection)
            selection.forEach(e => {
                e.selected = 0
                board.tiles.delete(e)
                board.grid[e.i][e.j] = null
            })
            board.selection.clear()
            board.next = null

        }
    }

    return false;
}


function selectionLogic(tile, click) {
    if (click == false && !tile.selected) {
        board.next = tile
        tile.hover = true;
    }
    if (click == true) {
        if (board.selection.has(tile) == false) {
            board.selection.add(tile)
            tile.selected = board.selection.size
        } else {
            board.selection.delete(tile)
            tile.selected = 0
            board.next = tile
            tile.hover = true
        }
    }

}




