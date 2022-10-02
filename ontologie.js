
class Node {
    constructor(name, score) {
        this.name = name
        this.score = score
        this.children = []
        this.parents = []
    }

    addChild(child) {
        this.children.push(child)
        child.parents.push(this)
    }

    addParent(parent) {
        this.parents.push(parent)
        parent.children.push(this)
    }

    findChild(name) {
        return this.children.find(c => c.name === name)
    }
}


function createOntology() {

    const candidateSymbols = []
    const darkColors = []
    const lightColors = []
    const root = new Node("root", 0)

    const Symbol = new Node('Symbol', 1); root.addChild(Symbol)
    const Letter = new Node('Letter', 1); Symbol.addChild(Letter)
    const UpperCase = new Node('UpperCase', 1); Letter.addChild(UpperCase)
    const LowerCase = new Node('LowerCase', 1); Letter.addChild(LowerCase)
    const vowel = new Node('vowel', 1); Letter.addChild(vowel)
    const consonant = new Node('consonant', 1); Letter.addChild(consonant)

    const Number = new Node('Number', 1); Symbol.addChild(Number)
    const odd = new Node('odd', 1); Number.addChild(odd)
    const even = new Node('even', 1); Number.addChild(even)
    const prime = new Node('prime', 1); Number.addChild(prime)

    const Color = new Node('Color', 1); root.addChild(Color)
    const Red = new Node('Red', 1); Color.addChild(Red)
    const Green = new Node('Green', 1); Color.addChild(Green)
    const Blue = new Node('Blue', 1); Color.addChild(Blue)
    const Yellow = new Node('Yellow', 1); Color.addChild(Yellow)
    const Orange = new Node('Orange', 1); Color.addChild(Orange)
    const Purple = new Node('Purple', 1); Color.addChild(Purple)

    //Most was written by copilot...
    for (const letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
        const nodeU = new Node(letter, 1)
        const nodeL = new Node(letter.toLowerCase(), 1)
        UpperCase.addChild(nodeU)
        LowerCase.addChild(nodeL)
        if ("AEIOU".includes(letter)) {
            vowel.addChild(nodeU)
            vowel.addChild(nodeL)
        } else {
            consonant.addChild(nodeU)
            consonant.addChild(nodeL)
        }
        //Add letters to candidates
        candidateSymbols.push(nodeU)
        candidateSymbols.push(nodeL)
    }

    const primeUnder100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
    for (let number = 0; number < 99; number++) {
        const node = new Node(number, 1)
        Number.addChild(node)
        if (number % 2) {
            even.addChild(node)
        } else {
            odd.addChild(node)
        }
        if (primeUnder100.includes(number)) {
            prime.addChild(node)
        }
        //Add number to candidates
        candidateSymbols.push(node)
    }

    console.log(root)

    const baseHue = [
        [Red, 0],
        [Green, 100],
        [Blue, 200],
        [Yellow, 60],
        [Orange, 30],
        [Purple, 250]
    ]

    for (const [col, hue] of baseHue) {
        //Do three time 
        for (let i = 0; i < 3; i++) {
            colorMode(HSB, 300, 100, 100, 100);
            light = new Node(color((300 + randomGaussian(hue, 15)) % 300, randomGaussian(45, 15), 85), 1);
            dark = new Node(color((300 + randomGaussian(hue, 15)) % 300, randomGaussian(90, 10), 0), 1);
            col.addChild(light)
            col.addChild(dark)
            lightColors.push(light)
            darkColors.push(dark)
        }
    }
    return { root, candidates: { lightColors, darkColors, symbols: candidateSymbols } }
}