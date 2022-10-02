class Grid {
    size = 0
    tileSize = 40
    selection = new Set()
    next = null
    selected = []
    grid = [[]]
    tiles = new Set()
    constructor(size, candidates) {
        this.size = size
        this.grid = Array(size).fill(1).map((e, i) => Array(size).fill(1).map((e, j) => new Tile(i, j, candidates)))
        this.grid.flat().forEach(t => this.tiles.add(t))
    }

    draw() {
        for (const tile of this.tiles) {
            tile.draw(this.tileSize)
        }
    }
    drawSelection() {
        const offset = { x: this.size * this.tileSize + this.tileSize, y: this.tileSize }
        const selection = Array.from(this.selection)
        selection.push(this.next)
        if (selection[0]) {
            selection[0].draw(this.tileSize, offset)
        }
        if (selection[1]) {
            offset.x += this.tileSize
            selection[1].draw(this.tileSize, offset)
        }
    }
}

function convertPixelToTile(x, y) {
    const tileSize = board.tileSize
    const i = floor(x / tileSize)
    const j = floor(y / tileSize)
    return { i, j }
}

function convertMouseToTile() {
    const { i, j } = convertPixelToTile(mouseX, mouseY)
    //Check if the mouse is on the board
    if (i >= 0 && i < board.size && j >= 0 && j < board.size) {
        return board.grid[i][j]
    }
    return null
}