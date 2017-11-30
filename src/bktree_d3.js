import Utility from './edit_distance';
import * as d3 from 'd3';

var word_length = 20;
var tol = 2;
var width = 960;
var height = 500;
var sfid = 1000;

/**
 * Implementation of BKTree, with animation and drawing in D3
 */
class BKTreeD3 {
  constructor() {
    this.w = width;
    this.h = height;
    this.tree = d3.layout.tree().size([width - 20, height - 20]);
    this.root = {};
    this.nodes = this.tree(this.root);
    this.diagonal = d3.svg.diagonal();
    this.duration = 500;

    this.root.x = 0;
    this.root.y = 0;
    this.root.word = "";
    this.root.distance = -1;
    this.root._bkchildren = new Array(word_length);
    this.root._bkchildren.fill(null);
    this.root.parent = this.root;
    this.root.px = this.root.x;
    this.root.py = this.root.y;

    this.svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(10, 10)");

    this.node = this.svg.selectAll(".node");
    this.link = this.svg.selectAll(".link");

    this.update();
  }

  /**
   * After doing any updating of the tree (insert, recoloring, etc.), this function will
   * redraw the tree with animations
   *
   * Currently only animates on insert
   */
  update() {
    var that = this;
    // Recompute the layout and data join.
    that.node = that.node.data(that.tree.nodes(that.root), function(d) { return d.id; });
    that.link = that.link.data(that.tree.links(that.nodes), function(d) { return d.source.id + "-" + d.target.id; });

    // Add entering nodes in the parent’s old position.
    var nodeEnter = that.node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.parent.px + "," + d.parent.py +")";
        });

    nodeEnter.append("circle")
        .attr("r", 4);

    nodeEnter.append("text")
       .attr("x", function(d) {
	return d.children || d._children ? -13 : 13; })
       .attr("dy", ".35em")
       .attr("text-anchor", function(d) {
	return d.children || d._children ? "end" : "start"; })
       .text(function(d) { return d.word; })
       .style("fill-opacity", 1);

    // Add entering links in the parent’s old position.
    that.link.enter().insert("path", ".node")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {x: d.source.px, y: d.source.py};
          return that.diagonal({source: o, target: o});
        });

    // Transition nodes and links to their new positions.
    var t = that.svg.transition()
        .duration(that.duration);

    t.selectAll(".link")
        .attr("d", that.diagonal);

    t.selectAll(".node")
        .attr("transform", function(d) {
          d.px = d.x;
          d.py = d.y;
          return "translate(" + d.px + "," + d.py + ")";
        });
  }

  addWord(node, word) {
    let dist = Utility.editDistance(word, node.word);
    console.log(dist);

    // look through _bkchildren
    // node at distance dist doesn't exist. So append here
    if (node._bkchildren[dist] == null) {
      var newNode = {id: this.nodes.length, "word": word, "distance": dist};
      newNode._bkchildren = (new Array(word_length)).fill(null);
      if (node.children) {
        // TODO: put in right index of array
        node.children.push(newNode);
      } else {
        node.children = [newNode];
      }
      node._bkchildren[dist] = newNode;

      // add to all nodes
      this.nodes.push(newNode);
      this.update();
    }

    // child of edit_distance "dist" exists. Recurse and call insert with the
    // child as root
    else {
      console.log("in else");
      this.addWord(node._bkchildren[dist], word);
    }
  }

  add(word) {
    this.addWord(this.root, word);
  }

  get_similar_words(word) {
    return this.get_similar_helper(this.root, word);
  }

  get_similar_helper(node, word) {
    let similar_words = [];

    if (node == null) {
      return similar_words;
    }

    let dist = Utility.editDistance(node.word, word);

    if (dist <= tol) {
      similar_words.push(node);
    }

    if (node.children == undefined) {
      return similar_words;
    }

    let end = (dist + tol);
    let start = (dist - tol);
    if (start < 1) {
      start = 1;
    }

    // Loop through children, since d3 doesn't allow null values in children
    for (var i = 0; i < node.children.length; i++) {
      let childDist = node.children[i].distance;
      if (childDist >= start && childDist < end) {
        let tmp = this.get_similar_helper(node.children[i], word);

        for (var j = 0; j < tmp.length; j++) {
          similar_words.push(tmp[j]);
        }
      }
    }

    return similar_words;
  }

  linkId(d) {
    return d.source.data.id + "-" + d.target.data.id;
  }

  nodeId(d) {
    return d.id;
  }

  x(d) {
    return d.data.x0 = d.x;
  }

  y(d) {
    return d.data.y0 = d.y;
  }
}

export default BKTreeD3;
