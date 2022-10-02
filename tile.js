
/**
 * Would be better to have it as a separate file but I can't work it out for now
 */
class Tile {
    selected = 0
    stroke = 2
    foreground = "red"
    background = "blue"
    symbol = "A"

    constructor(i, j, candidates) {
        this.i = i
        this.j = j
        this.foreground = random(candidates.darkColors).name
        this.background = random(candidates.lightColors).name
        this.symbol = random(candidates.symbols).name
    }

    draw(size, offset) {
        if (!offset) offset = { x: this.i * size, y: this.j * size }
        fill(this.background)
        strokeWeight(this.stroke);
        stroke(borderColors[this.selected])
        rect(offset.x
            , offset.y
            , size - this.stroke, size - this.stroke);
        textAlign(CENTER, CENTER);
        textSize(size / 2);
        strokeWeight(0);
        fill(this.foreground)
        text(this.symbol, offset.x + size / 2, offset.y + size / 2);
    }



}