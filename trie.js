const Node = require("./node");

class Trie {
    constructor() {
        this.root = new Node(null)
    }
    add(word) {
        let current = this.root
        // iterate through all the characters of word
        for (let character of word) {
            // if node doesn't have the current character as child, insert it
            if (current.children[character] === undefined) {
                current.children[character] = new Node(character)
            }
            // move down, to insert next character
            current = current.children[character]
        }
        // mark the last inserted character as end of the word
        current.isEndOfWord = true
    }
    find(word) {
        let current = this.root
        // iterate through all the characters of word
        for (let character of word) {
            if (current.children[character] === undefined) {
                // could not find this character in sequence, return false
                return false
            }
            // move down, to match next character
            current = current.children[character]
        }
        // found all characters, return true if last character is end of a word
        return current.isEndOfWord
    }
    findAll(phrase = '', current = this.root){
        const suggestions = []
        const backtracking = (phrase, current) => {
            if(current.isEndOfWord) suggestions.push(`${phrase}`)
            for (const [_, child] of Object.entries(current.children)) {
                backtracking(phrase + child.value, child)
            }
        }
        backtracking(phrase, current)
        return suggestions

    }
    suggest(initials){
        let count = 0, current = this.root
        // go to current node
        while (initials.length > count) {
            if(!current.children[initials[count]]){
                return []
            }
            current = current.children[initials[count]]
            count++
        }
        // find all words
        return this.findAll(initials, current)
    }
}

module.exports = Trie