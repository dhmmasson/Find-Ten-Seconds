// Dimitri Masson
let board = {}
const borderColors = ["#001219", "#E9D8A6", "#E9C46A"]



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


    if (board.selection == 2) {
        const offset = { x: board.size * board.tileSize + 3 * board.tileSize, y: board.tileSize }

        let keywords = Array.from(board.selected[1].keywords).filter(e => e.score).filter(e => board.selected[2].keywords.has(e)).map(e => e.name)

        fill("#E9D8A6")
        textSize(board.tileSize / 4);
        textAlign(LEFT, TOP);
        text(keywords.join(", "), offset.x, offset.y, board.tileSize * 2, board.tileSize)
    }
}


function mouseClicked() {

    console.log(mouseX, mouseY)
    const tile = board.grid[floor(mouseX / board.tileSize)][floor(mouseY / board.tileSize)]
    //Terrible code there...
    if (tile.selected == 0) {
        if (board.selection == 2) {
            board.selected[2].selected = 0
        } else {
            board.selection++
        }
        tile.selected = board.selection
        board.selected[tile.selected] = tile
    } else {
        // s : 1 => 2 , s : 2 => 1 
        board.selected[1] = board.selected[3 - tile.selected]
        board.selected[2] = null
        if (board.selection == 2) board.selected[1].selected = 1
        tile.selected = 0
        board.selection--
    }
    console.log(tile.i, tile.j, tile.selected, tile.keywords)


    // prevent default
    return false;
}
