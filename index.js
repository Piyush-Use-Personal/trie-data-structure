const Trie = require("./trie");

const trie = new Trie()
trie.add('ace')
trie.add('ant')
trie.add('car')
trie.add('cgr')
trie.add('cat')

console.log(trie.findAll())
console.log(trie.suggest('ca'))
console.log(trie.suggest('a'))