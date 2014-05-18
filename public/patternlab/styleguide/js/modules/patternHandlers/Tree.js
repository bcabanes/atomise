function Tree() {
    this.root = new Node("patterns");
    console.log(this.root);
    this.root.add(["atoms"]);
    this.root.add(["molecules"]);
    this.root.add(["organisms"]);
    this.root.add(["templates"]);
    this.root.add(["pages"]);
}

Tree.prototype.add = function(file) {
    var aFiles = file.split("/");

    this.root.add(aFiles);
}

Tree.prototype.accept = function(visitor) {
    this.root.accept(visitor);
}
