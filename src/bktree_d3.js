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
    console.log(this.root);
  }

  update() {
    var that = this;
    // Add a new node to a random parent.
    var n = {id: this.nodes.length, "name": "name"},
        p = that.nodes[Math.random() * that.nodes.length | 0];
    if (p.children) p.children.push(n); else p.children = [n];
    that.nodes.push(n);

    // Recompute the layout and data join.
    that.node = that.node.data(that.tree.nodes(that.root), function(d) { return d.id; });
    that.link = that.link.data(that.tree.links(that.nodes), function(d) { return d.source.id + "-" + d.target.id; });
    console.log("node");
    console.log(that.node);

    // Add entering nodes in the parent’s old position.
    var nodeEnter = that.node.enter().append("circle")
        .attr("class", "node")
        .attr("r", 4)
        .attr("cx", function(d) { return d.parent.px; })
        .attr("cy", function(d) { return d.parent.py; });

    nodeEnter.append("text")
       .attr("x", function(d) {
	return d.children || d._children ? -13 : 13; })
       .attr("dy", ".35em")
       .attr("text-anchor", function(d) {
	return d.children || d._children ? "end" : "start"; })
       .text(function(d) { return d.name; })
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
        .attr("cx", function(d) { return d.px = d.x; })
        .attr("cy", function(d) { return d.py = d.y; });
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
