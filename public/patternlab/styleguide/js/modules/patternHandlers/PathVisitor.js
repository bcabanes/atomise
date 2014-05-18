PathVisitor.prototype = new Visitor();

function PathVisitor(originPath) {
    this.path = [];
    this.origin = originPath;
}

PathVisitor.prototype.visitBeforeSons = function(node) {
    this.path.push(node.getValue());
}

PathVisitor.prototype.visitAfterSons = function(node) {
    this.path.pop();
}

PathVisitor.prototype.begin = function(node) {
    node.setPath('#'+this.path.join("/") + "/" + node.getValue());
}

PathVisitor.prototype.end = function(node) {
}
