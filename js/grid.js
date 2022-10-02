class Grid {
    size = 0
    tileSize = 40
    selection = 0
    selected = []
    grid = [[]]
    tiles = []
    constructor(size, candidates) {
        this.size = size
        this.grid = Array(size).fill(1).map((e, i) => Array(size).fill(1).map((e, j) => new Tile(i, j, candidates)))

        this.grid.flat().forEach(t => this.tiles.push(t))
    }

    draw() {
        for (const tile of this.tiles) {
            tile.draw(this.tileSize)
        }
    }
    drawSelection() {
        const offset = { x: this.size * this.tileSize + this.tileSize, y: this.tileSize }
        if (this.selected[1]) {
            this.selected[1].draw(this.tileSize, offset)
        }
        if (this.selected[2]) {
            offset.x += this.tileSize
            this.selected[2].draw(this.tileSize, offset)
        }
    }
}