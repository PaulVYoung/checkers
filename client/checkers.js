Template.boardArea.rendered = function () {
  var self = this;
  self.node = self.find("svg");

  if (! self.handle) {
    self.handle = Meteor.autorun(function () {

      var drag = d3.behavior.drag().on("drag", dragmove);
      function dragmove(d) {
        var limitedX = Math.min(Math.max(d3.event.x,5),395);
        var limitedY = Math.min(Math.max(d3.event.y,5),395);
        d3.select(this)
          .attr("cx", limitedX)
          .attr("cy", limitedY);
        Pieces.update(d._id, {$set: {x: limitedX, y: limitedY}});
      }
      var updatePieces = function (group) {
        group.attr("id", function (piece) { return piece._id; })
        .attr("cx", function (piece) { return piece.x; })
        .attr("cy", function (piece) { return piece.y; })
        .attr("r", function (piece) { return piece.r; })
        .attr("fill", function (piece) { return piece.color; });
      };

      var pieces = d3.select(self.node).select(".pieces").selectAll("circle")
        .data(Pieces.find().fetch(), function (piece) { return piece._id; });

      updatePieces(pieces.enter().append("circle").call(drag));
      updatePieces(pieces.transition().duration(250).ease("cubic-out"));
      pieces.exit().transition().duration(250).attr("r", 0).remove();
    });
  }
};

Template.boardArea.destroyed = function () {
  this.handle && this.handle.stop();
};
