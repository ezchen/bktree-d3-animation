import Utility from './edit_distance';

var word_length = 20;
var tol = 2;

class Node {
  constructor(word, max_length) {
    this.word = word;
    this.max_length = max_length;
    this.children = new Array(max_length);
  }
}

class BKTree {
  constructor() {
    this.root = new Node("", word_length);
    this.current = this.root;
  }

  /**
   * Helper function for the add_word function. Adds a node to the subtree
   * starting at root according to BKTree rules. Returns nothing
   *
   * @param Node root node of the subtree
   * @param Node curr node that we're attempting to add
   */
  add(root, curr) {
    let dist = Utility.editDistance(curr.word, root.word);

    // child of edit_distance "dist" doesn't exist. So insert it here
    if (root.children[dist] == undefined) {
      root.children[dist] = curr;
    }

    // child of edit_distance "dist" exists. Recurse and call insert with the
    // child as root
    else {
      this.add(root.children[dist], curr);
    }
  }

  /**
   * Takes in a string and adds the word to this BKTree
   *
   * @param String word to be added
   */
  add_word(word) {
    if (this.root.word == "") {
      this.root = new Node(word, word_length);
    } else {
      this.add(this.root, new Node(word, word_length));
    }
  }

  get_similar_words(word) {
    if (this.root.word == "") {
      return [];
    } else {
      return this.get_similar_helper(this.root, word);
    }
  }

  get_similar_helper(current, word) {
    let similar_words = [];

    if (current == undefined) {
      return similar_words;
    }

    let dist = Utility.editDistance(current.word, word);

    if (dist <= tol) {
      similar_words.push(current.word);
    }

    // Iterate over range (dist-tol, dist+tol)
    let start = (dist - tol);
    if (start < 1) {
      start = 1;
    }

    for (var i = start; i < (dist + tol); i++) {
      let tmp = this.get_similar_helper(current.children[i], word);

      for (var j = 0; j < tmp.length; j++) {
        similar_words.push(tmp[j]);
      }
    }

    return similar_words;
  }
}

export default BKTree;
