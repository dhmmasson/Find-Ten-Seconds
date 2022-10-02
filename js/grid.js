class Grid {
    size = 0
    tileSize = 40
    selection = new Set()
    next = null
    selected = []
    grid = [[]]
    tiles = new Set()
    history = []
    missingTiles = []
    roundScore = 0
    totalScore = 0
    candidates = null

    constructor(size, candidates) {
        this.candidates = candidates
        this.size = size
        this.grid = Array(size).fill(1).map((e, i) => Array(size).fill(1).map((e, j) => new Tile(i, j, candidates)))
        this.grid.flat().forEach(t => this.tiles.add(t))
    }

    randomTile() {
        return random(Array.from(this.tiles))
    }

    draw() {
        //Draw Grid

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                strokeWeight(2);
                stroke("#001219");
                fill("#00161f");
                rect(i * this.tileSize
                    , j * this.tileSize
                    , this.tileSize - 2, this.tileSize - 2
                    , this.tileSize / 10);
            }
        }
        for (const tile of this.tiles) {
            tile.draw(this.tileSize)
        }
    }
    drawScore() {
        const offset = { x: this.size * this.tileSize + this.tileSize, y: 0 }
        textSize(this.tileSize / 2);
        textAlign(LEFT, TOP);
        const tileGained = tileGain(this.roundScore)
        text(`Total: ${this.totalScore} `, offset.x, offset.y);
        offset.y += this.tileSize / 2
        text(`Round: ${this.roundScore} (+${tileGained} tile${tileGained > 1 ? "s" : ""})`, offset.x, offset.y);
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
        for (const [tile1, tile2, score] of this.history) {
            offset.y += this.tileSize / 2
            tile1.draw(this.tileSize / 2, offset)
            offset.x += this.tileSize / 2
            tile2.draw(this.tileSize / 2, offset)
            offset.y += this.tileSize / 4
            offset.x += this.tileSize / 2
            textSize(this.tileSize / 5);
            textAlign(LEFT, CENTER);
            text(`+ ${score} `, offset.x, offset.y);
            offset.x -= this.tileSize
            offset.y -= this.tileSize / 4
        }

        if (this.selection.size == 1 && this.next) {
            const offset = { x: this.size * this.tileSize + 3 * this.tileSize, y: this.tileSize }
            const selection = Array.from(this.selection)
            selection.push(this.next)
            let { keywords, score } = computeScore(selection[0], selection[1])
            fill("#E9D8A6")
            textSize(this.tileSize / 5);
            textAlign(LEFT, TOP);
            text(Math.round(score) + "\n" + keywords.map(e => `${e.name} (${Math.floor(e.score)})`).join(", "), offset.x, offset.y, this.tileSize * 3, this.tileSize)
        }
    }
    replenishBoard() {
        const tiles = this.history.map(([tile1, tile2]) => [tile1, tile2]).flat()
        let tileGained = tileGain(this.roundScore)
        while (this.missingTiles.length > 0 && tileGained > 0) {
            const tile = random(this.missingTiles)
            //copilot remove tile from missing tiles array 
            this.missingTiles.splice(this.missingTiles.indexOf(tile), 1)
            const newTile = new Tile(tile.i, tile.j, this.candidates)
            this.tiles.add(newTile)
            this.grid[newTile.i][newTile.j] = newTile
            tileGained--
        }
    }
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



function removeRandomTile() {
    if (saveDate.easyMode) return
    let tile = board.randomTile()
    if (!tile) return endGame()
    let tries = 10
    while (tile.selected != 0 && --tries > 0) {
        tile = board.randomTile()
    }
    if (tries > 0) {
        removeTile(tile)
    }
}


function computeScore(tile1, tile2) {
    let keywords = Array.from(tile1.keywords).filter(e => e.score).filter(e => tile2.keywords.has(e))
    let score = keywords.reduce((a, b) => a + b.score, 0)
    return { keywords, score }
}

function tileGain(score) {
    return Math.floor(score / 20)
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