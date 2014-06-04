BuildArrayVisitor.prototype = new Visitor();

function BuildArrayVisitor() {
  this.patterns = [];
  this.path = '';
}

BuildArrayVisitor.prototype.begin = function(node) {
  if(node.isLeaf()) {
    this.patterns[node.getName()] = this.path + node.getName();
  }else{
    this.path += node.getName() + '/';
  }
};

BuildArrayVisitor.prototype.end = function(node) {
};

BuildArrayVisitor.prototype.visitBeforeSons = function(node) {
};

BuildArrayVisitor.prototype.visitAfterSons = function(node) {
  this.path = this.path.split('/');
  this.path = this.path.slice(1, this.path.length - 1);
  this.path = this.path.join('/');
};

BuildArrayVisitor.prototype.getPatterns = function() {
  return this.patterns;
};
