function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

BuildMenuVisitor.prototype = new Visitor();

function BuildMenuVisitor() {
  this.menu = "";
  this.depth = 0;
}

BuildMenuVisitor.prototype.begin = function(node) {
  if (node.isLeaf()) {
    this.menu += '<li><a href="#">'+capitaliseFirstLetter(node.getName())+'</a>';
  } else {
    this.menu += '<li class="sg--nav-'+node.getName().toLowerCase()+'"><a class="sg--acc-handle" href="#">'+node.getName().toUpperCase()+'</a>';
  }
};

BuildMenuVisitor.prototype.end = function(node) {
  this.menu += '</li>';
};

BuildMenuVisitor.prototype.visitBeforeSons = function(node) {
  this.depth += 1;
  this.menu += '<ul class="sg--acc-panel'+(this.depth === 2 ? ' sg--sub-nav' : '')+'">';
};

BuildMenuVisitor.prototype.visitAfterSons = function(node) {
  this.depth -= 1;
  this.menu += '</ul>';
};

BuildMenuVisitor.prototype.getMenu = function() {
  return '<ul class="left">'+this.menu+'</ul>';
};
