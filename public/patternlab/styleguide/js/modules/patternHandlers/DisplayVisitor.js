DisplayVisitor.prototype = new Visitor();

function DisplayVisitor() {
    this.path = '';
}

DisplayVisitor.prototype.visitBeforeSons = function(node) {
    this.path += "<ul>";
}

DisplayVisitor.prototype.visitAfterSons = function(node) {
    this.path += "</ul>";
}

DisplayVisitor.prototype.begin = function(node) {
    this.path += "<li><a href='"+node.getPath()+"'>"+node.getValue()+"</a>";
}

DisplayVisitor.prototype.end = function(node) {
    this.path += "</li>";
}

DisplayVisitor.prototype.getPath = function() {
    return this.path;
}
