class Grid {
    size = 0
    tileSize = 40
    selection = new Set()
    next = null
    selected = []
    grid = [[]]
    tiles = new Set()
    history = []


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
            offset.x -= this.tileSize
        }
        offset.y += this.tileSize / 2
        for (const [tile1, tile2] of this.history) {
            offset.y += this.tileSize / 2
            tile1.draw(this.tileSize / 2, offset)
            offset.x += this.tileSize / 2
            tile2.draw(this.tileSize / 2, offset)
            offset.x -= this.tileSize / 2
        }

        if (this.selection.size == 1 && this.next) {
            const offset = { x: this.size * this.tileSize + 3 * this.tileSize, y: this.tileSize }
            const selection = Array.from(this.selection)
            selection.push(this.next)
            let keywords = Array.from(selection[0].keywords).filter(e => e.score).filter(e => selection[1].keywords.has(e)).map(e => e.name)

            fill("#E9D8A6")
            textSize(this.tileSize / 4);
            textAlign(LEFT, TOP);
            text(keywords.join(", "), offset.x, offset.y, this.tileSize * 2, this.tileSize)



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