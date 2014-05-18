function Node(value) {
    this.value = value;
    this.path = undefined;
    this.sons = [];
}

Node.prototype.getValue = function () {
    return this.value;
}

Node.prototype.setPath = function (path) {
    this.path = path;
}

Node.prototype.getPath = function () {
    return this.path;
}

Node.prototype.add = function(aFiles) {
    if (aFiles.length != 0) {
        var item = aFiles.shift();
        var son = this.getSon(item);
        if (son) {
            son.add(aFiles);
        } else {
            son = new Node(item);
            this.sons.push(son);
            son.add(aFiles);
        }
    }
}

Node.prototype.getSon = function(name) {
    for(var i in this.sons) {
        if (this.sons[i].getValue() == name) {
            return this.sons[i];
        }
    }
    return false;
}

Node.prototype.isLeaf = function() {
    return this.sons.length == 0;
}

Node.prototype.accept = function(visitor) {
    visitor.begin(this);
    if (!this.isLeaf()) {
        visitor.visitBeforeSons(this);
        for(var i in this.sons) {
            this.sons[i].accept(visitor);
        }
        visitor.visitAfterSons(this);
    }
    visitor.end(this);
}