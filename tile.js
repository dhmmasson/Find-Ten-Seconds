
/**
 * Would be better to have it as a separate file but I can't work it out for now
 */
class Tile {
    selected = 0
    stroke = 2
    foregroundColor = "red"
    backgroundColor = "blue"
    symbolDisplay = "A"

    constructor(i, j, candidates) {
        this.i = i
        this.j = j

        this.foreground = random(candidates.darkColors)
        this.background = random(candidates.lightColors)
        this.symbol = random(candidates.symbols)
        this.foregroundColor = this.foreground.name
        this.backgroundColor = this.background.name
        this.symbolDisplay = this.symbol.name

        this.keywords = new Set([this.symbol, this.background, this.background.getAllParents(), this.symbol.getAllParents()].flat())
    }

    draw(size, offset) {
        if (!offset) offset = { x: this.i * size, y: this.j * size }
        fill(this.backgroundColor)
        strokeWeight(this.stroke);
        stroke(borderColors[this.selected])
        rect(offset.x
            , offset.y
            , size - this.stroke, size - this.stroke
            , size / 10);
        textAlign(CENTER, CENTER);
        textSize(size / 2);
        strokeWeight(0);
        fill(this.foregroundColor)
        text(this.symbolDisplay, offset.x + size / 2, offset.y + size / 2);
    }




}