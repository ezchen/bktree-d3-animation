import * as d3 from 'd3';
import Utility from './edit_distance';
import BKTree from './bktree';
import BKTreeD3 from './bktree_d3.js';
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
window.bktree = bktree;
/*
var width = 960,
    height = 500;

var tree = d3.layout.tree()
    .size([width - 20, height - 20]);

var root = {},
    nodes = tree(root);

root.parent = root;
root.px = root.x;
root.py = root.y;

var diagonal = d3.svg.diagonal();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(10,10)");

var node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

var duration = 750

function update() {
  if (nodes.length >= 2) return clearInterval(timer);

  // Add a new node to a random parent.
  var n = {id: nodes.length},
      p = nodes[Math.random() * nodes.length | 0];
  if (p.children) p.children.push(n); else p.children = [n];
  nodes.push(n);

  // Recompute the layout and data join.
  node = node.data(tree.nodes(root), function(d) { return d.id; });
  link = link.data(tree.links(nodes), function(d) { return d.source.id + "-" + d.target.id; });
  console.log("node2");
  console.log(node);

  // Add entering nodes in the parent’s old position.
  node.enter().append("circle")
      .attr("class", "node")
      .attr("r", 4)
      .attr("cx", function(d) { console.log(d);console.log('hello2'); return d.parent.px; })
      .attr("cy", function(d) { return d.parent.py; });

  /*
  // Add entering links in the parent’s old position.
  link.enter().insert("path", ".node")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: d.source.px, y: d.source.py};
        return diagonal({source: o, target: o});
      });

  // Transition nodes and links to their new positions.
  var t = svg.transition()
      .duration(duration);

  t.selectAll(".link")
      .attr("d", diagonal);

  t.selectAll(".node")
      .attr("cx", function(d) { return d.px = d.x; })
      .attr("cy", function(d) { return d.py = d.y; });
}

update();
*/
