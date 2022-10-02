
class Node {
    constructor(name, score, value) {
        this.name = name
        this.value = value
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

    getAllParents() {
        return this.parents.concat(this.parents.flatMap(p => p.getAllParents()))
    }
    findNode(name) {
        if (this.name === name) return this
        for (const child of this.children) {
            const found = child.findNode(name)
            if (found) return found
        }
        return null
    }
    map(f) {
        f(this)
        this.children.forEach(c => c.map(f))
    }
}


function createOntology() {

    const candidateSymbols = []
    const darkColors = []
    const lightColors = []
    const root = new Node("root", 0)

    const Symbol = new Node('Symbol', 0); root.addChild(Symbol)
    const Letter = new Node('Letter', 10); Symbol.addChild(Letter)
    const UpperCase = new Node('UpperCase', 10); root.addChild(UpperCase)
    const LowerCase = new Node('LowerCase', 10); root.addChild(LowerCase)
    const vowel = new Node('vowel', 20); Letter.addChild(vowel)
    const consonant = new Node('consonant', 5); Letter.addChild(consonant)

    const Number = new Node('Number', 10); Symbol.addChild(Number)
    const odd = new Node('odd', 5); Number.addChild(odd)
    const even = new Node('even', 5); Number.addChild(even)
    const prime = new Node('prime', 10); Number.addChild(prime)
    const powerOfTwo = new Node('powerOfTwo', 5); Number.addChild(powerOfTwo)
    const powerOfThree = new Node('powerOfThree', 5); Number.addChild(powerOfThree)
    const theAnswerToEverything = new Node('theAnswerToEverything', 42); Number.addChild(theAnswerToEverything)
    const niceNumber = new Node('Nice!', 69); Number.addChild(niceNumber)

    const Color = new Node('Color', 0); root.addChild(Color)
    const Red = new Node('Red', 5); Color.addChild(Red)
    const Green = new Node('Green', 5); Color.addChild(Green)
    const Blue = new Node('Blue', 5); Color.addChild(Blue)
    const Yellow = new Node('Yellow', 5); Color.addChild(Yellow)
    const Orange = new Node('Orange', 5); Color.addChild(Orange)
    const Purple = new Node('Purple', 5); Color.addChild(Purple)

    //Most was written by copilot...
    for (const letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase()) {
        const node = new Node("letter " + letter, 20)
        const nodeU = new Node(letter.toUpperCase(), 0)
        const nodeL = new Node(letter, 0)
        UpperCase.addChild(nodeU)
        LowerCase.addChild(nodeL)
        Letter.addChild(node)
        node.addChild(nodeU)
        node.addChild(nodeL)
        if ("aeiou".includes(letter)) {
            vowel.addChild(node)
        } else {
            consonant.addChild(node)
        }
        //Add letters to candidates
        candidateSymbols.push(nodeU)
        candidateSymbols.push(nodeL)
    }



    const primeUnder100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
    const listofpowerOfTwo = [1, 2, 4, 8, 16, 32, 64]
    const listofpowerOfThree = [1, 3, 9, 27, 81, 243, 729]

    for (let number = 0; number < 99; number++) {
        const node = new Node(number, 50)
        //Number.addChild(node)
        if (number % 2) {
            odd.addChild(node)
        } else {
            even.addChild(node)
        }
        if (primeUnder100.includes(number)) {
            prime.addChild(node)
        }
        if (listofpowerOfTwo.includes(number)) {
            powerOfTwo.addChild(node)
        }
        if (listofpowerOfThree.includes(number)) {
            powerOfThree.addChild(node)
        }
        //Add number to candidates
        candidateSymbols.push(node)
    }
    //Copilot knows... this was written by copilot...
    //niceNumber.addChild(new Node("69", 0))
    //theAnswerToEverything.addChild(new Node("42", 0))

    //Easter Eggs
    Number.addChild(root.findNode("e"))
    Number.addChild(root.findNode("i"))
    Number.addChild(root.findNode("O"))
    niceNumber.addChild(root.findNode(69))
    theAnswerToEverything.addChild(root.findNode(42))
    root.findNode(0).addChild(root.findNode("O"))


    darkColors.push(new Node("Sandstone", 1, "#E9D8A6"))
    const colors = [[Blue, "#00778F", "Teal"],
    [Blue, "#0A9396", "Virdian"],
    [Blue, "#3B8C7F", "Celadon"],

    [Orange, "#E99700", "Gamboge"],
    [Orange, "#E47507", "Princeton"],
    [Orange, "#DD6713", "Chocolate"],

    [Red, "#B92113", "Carnelian"],
    [Red, "#9D1B12", "Rufous"],
    [Red, "#7A1815", "Maroon"]]

    for (const [col, hex, name] of colors) {
        light = new Node(name, 10, color(hex));
        col.addChild(light)
        lightColors.push(light)
    }

    return { root, candidates: { lightColors, darkColors, symbols: candidateSymbols } }
}


function computeWeights(node) {
    node.children.forEach(computeWeights)
    if (node.children.length === 0) {
        node.score = 1
    } else {
        node.score = node.score * (1 + node.children.reduce((acc, p) => acc * p.score, 1))
    }
}
function prettyPrint(node, indent = 0) {

    if (node.children.length > 3) console.groupCollapsed(" ".repeat(indent) + node.name + " " + node.score)
    else console.log(" ".repeat(indent) + node.name + " " + node.score)
    node.children.forEach(c => prettyPrint(c, indent + 2))
    if (node.children.length > 3) console.groupEnd()
}