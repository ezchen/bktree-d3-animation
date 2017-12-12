import * as d3 from 'd3';
import Utility from './edit_distance';
import BKTree from './bktree';
import BKTreeD3 from './bktree_d3.js';
import TreeControls from './controls.js';
import TextAnimationListener from './text_animation_listener.js';
import WordListListener from './word_list_listener.js';
console.log("working2");
console.log(Utility.min(1,2,3));
console.log(Utility.editDistance("hello", "hell"));
console.log(Utility.editDistance("hello", "ehell"));
const square = d3.selectAll("rect");
square.style("fill", "orange");

var tree = new BKTree();
console.log(tree.root.word);
tree.add_word("help");
console.log(tree.root.word);
tree.add_word("hell");
tree.add_word("hello");
tree.add_word("loops");
tree.add_word("helps");
console.log(tree.root);
console.log(tree.get_similar_words("hel"));





var bktree = new BKTreeD3();
var controls = new TreeControls(bktree);
var descriptionListener = new TextAnimationListener();
var wordListListener = new WordListListener();
bktree.animationListeners.push(descriptionListener);
bktree.wordListListeners.push(wordListListener);
window.bktree = bktree;
