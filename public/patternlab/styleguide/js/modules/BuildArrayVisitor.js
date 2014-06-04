BuildArrayVisitor.prototype = new Visitor();

function BuildArrayVisitor() {
  this.patterns = [];
  this.path = [];
}

BuildArrayVisitor.prototype.begin = function(node) {
  if(node.isLeaf()){
    var path = "";
    if (this.path.length) {
      path += this.path.join("/") + "/";
    }
    path += node.getValue();
    this.patterns[node.getName()] = path;
  }
};

BuildArrayVisitor.prototype.end = function(node) {
};

BuildArrayVisitor.prototype.visitBeforeSons = function(node) {
  this.path.push(node.getValue());
};

BuildArrayVisitor.prototype.visitAfterSons = function(node) {
  this.path.pop();
};

BuildArrayVisitor.prototype.getPatterns = function() {
  return this.patterns;
};
