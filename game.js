// Dimitri Masson
let board = {}

const borderColors = ["gray", "red", "blue"]

const keywords = {
    symbol: 1,
    letter: 1,
    number: 1,
    A: 1,
    B: 1,
    C: 1,
    D: 1,
    E: 1,
    F: 1,
    G: 1,
    H: 1,
    I: 1,
    J: 1,
    K: 1,
    L: 1,
    M: 1,
    N: 1,
    O: 1,
    P: 1,
    Q: 1,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 1,
    W: 1,
    X: 1,
    Y: 1,
    Z: 1,

}

class Tile {
    selected = 0
    stroke = 2
    constructor(i, j) {
        this.i = i
        this.j = j
        this.color = color(random(0, 300), randomGaussian(40, 20), 80);
    }

    draw(size, offset) {
        if (!offset) offset = { x: this.i * size, y: this.j * size }
        fill(this.color)
        strokeWeight(this.stroke);
        stroke(borderColors[this.selected])
        rect(offset.x
            , offset.y
            , size - this.stroke, size - this.stroke);
    }

}

class Grid {
    size = 0
    tileSize = 40
    selection = 0
    selected = []
    grid = [[]]
    tiles = []
    constructor(size) {
        this.size = size
        this.grid = Array(size).fill(1).map((e, i) => Array(size).fill(1).map((e, j) => new Tile(i, j)))

        this.grid.flat().forEach(t => this.tiles.push(t))
    }

    draw() {
        for (const tile of this.tiles) {
            tile.draw(this.tileSize)
        }
    }
    drawSelection() {
        console.log(this.selected[1])
        if (this.selected[1])
            this.selected[1].draw(this.tileSize, { x: 0, y: this.size * this.tileSize })
        if (this.selected[2]) this.selected[2].draw(this.tileSize, { x: this.tileSize, y: this.size * this.tileSize })
    }
}


function setup() {
    //Clear console between re run
    console.clear()
    //My favorite color mode
    colorMode(HSB, 300, 100, 100, 100);
    board = new Grid(10)

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
    size = select("#canvasDiv").size();
    resizeCanvas(size.width, size.height);
}


//Main drawing function
function draw() {
    background(51);
    board.draw()
    board.drawSelection()
}


function mouseClicked() {
    const tile = board.grid[floor(mouseX / 40)][floor(mouseY / 40)]
    console.log(tile.i, tile.j, tile.selected)
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
        console.log(tile.selected, board.selected[1], board.selected[3 - tile.seected])
        board.selected[1] = board.selected[3 - tile.selected]
        if (board.selection == 2) board.selected[1].selected = 1
        tile.selected = 0
        board.selection--
    }
    console.log(tile.i, tile.j, tile.selected)

    // prevent default
    return false;
}