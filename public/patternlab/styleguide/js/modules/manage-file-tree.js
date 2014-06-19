function Node(value) {
    this.value = './';
    if (value !== undefined) {
      this.value = value;
    }
    this.path = undefined;
    this.extension = undefined;
    this.type = undefined;
    this.name = undefined;
    this.sons = [];
}

Node.prototype.getValue = function () {
    return this.value;
};

Node.prototype.getPath = function () {
    return this.path;
};

Node.prototype.setPath = function (path) {
    this.path = path;
};

Node.prototype.getExtension = function () {
    return this.extension;
};

Node.prototype.setExtension = function (extension) {
    this.extension = extension;
};

Node.prototype.getType = function () {
    return this.type;
};

Node.prototype.setName = function (name) {
    this.name = name;
};

Node.prototype.getName = function () {
    return this.name;
};

Node.prototype.setType = function (type) {
    this.type = type;
};

Node.prototype.getSons = function () {
    return this.sons;
};

Node.prototype.add = function(aFiles) {
  if (aFiles.length !== 0) {
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
};

Node.prototype.getSon = function(name) {
  for(var i in this.sons) {
    if (this.sons[i].getValue() == name) {
      return this.sons[i];
    }
  }
  return false;
};

Node.prototype.isLeaf = function() {
  return this.sons.length === 0;
};

Node.prototype.accept = function(visitor, isRoot) {
  var i;
  if (isRoot) {
    for(i in this.sons) {
      this.sons[i].accept(visitor);
    }
  } else {
    visitor.begin(this);
    if (!this.isLeaf()) {
      visitor.visitBeforeSons(this);
      for(i in this.sons) {
        this.sons[i].accept(visitor);
      }
      visitor.visitAfterSons(this);
    }
    visitor.end(this);
  }
};
;function Tree(origin) {
  this.root = new Node(origin);
  this.attributes = {};
}

Tree.prototype.getRoot = function() {
    return this.root;
};
Tree.prototype.add = function(file) {
  var aFiles = file.split("/");

  this.root.add(aFiles);
};

Tree.prototype.accept = function(visitor) {
    this.root.accept(visitor, true);
};
;function Visitor() {
}

Visitor.prototype.visitBeforeSons = function(node) {
};

Visitor.prototype.visitAfterSons = function(node) {
};

Visitor.prototype.begin = function(node) {
};

Visitor.prototype.end = function(node) {
};
;function FindVisitor(aFilters) {
  this.results = [];
  this.filters = aFilters;
}

FindVisitor.prototype.getResults = function() {
  return this.results;
};

FindVisitor.prototype.visitBeforeSons = function(node) {
};

FindVisitor.prototype.visitAfterSons = function(node) {
};

FindVisitor.prototype.begin = function(node) {
  var bReturn = true;
  for (var i in this.filters) {
    var filter = this.filters[i];
    switch (filter.name) {
      case 'extension':
        if (node.getExtension() !== filter.value) {
          bReturn = false;
        }
        break;
      case 'type':
        if (node.getType() !== filter.value) {
          bReturn = false;
        }
        break;
      case 'path':
        if (node.getPath() !== filter.value) {
          bReturn = false;
        }
        break;
    }
  }
  if (bReturn) {
    this.results.push({
      name: node.getName(),
      path: node.getPath(),
      type: node.getType()
    });
  }
};

FindVisitor.prototype.end = function(node) {
};
;UpdateVisitor.prototype = new Visitor();

function UpdateVisitor(originPath) {
  this.path = [];
  this.origin = originPath;

  this.computePath = function(node) {
    var path = "";
    if (this.origin) {
      path += this.origin + "/";
    }
    if (this.path.length) {
      path += this.path.join("/") + "/";
    }
    path += node.getValue();

    return path;
  };

  this.computeExtension = function(node) {
    if (!node.isLeaf()) {
      return false;
    }

    var aFilePart = node.getValue().split('.');
    if (aFilePart.length < 2) {
      return "";
    }

    return aFilePart.pop();
  };

  this.computeType = function (node) {
    var type;
    switch (node.getExtension()) {
      case false:
        type = 'directory';
        break;
      case 'mustache':
        type = 'mustache';
        break;
      default:
        type = "file";
    }
    return type;
  };

  this.computeName = function(node) {
    var aFilePart = node.getValue().split('.');
    if (aFilePart.length > 1) {
      aFilePart.pop();
    }
    return aFilePart.join(".");
  };
}

UpdateVisitor.prototype.visitBeforeSons = function(node) {
  this.path.push(node.getValue());
};

UpdateVisitor.prototype.visitAfterSons = function(node) {
  this.path.pop();
};

UpdateVisitor.prototype.begin = function(node) {
  node.setPath(this.computePath(node));
  node.setExtension(this.computeExtension(node));
  node.setType(this.computeType(node));
  node.setName(this.computeName(node));
};

UpdateVisitor.prototype.end = function(node) {
};
;var FileTree = function() {
  this.tree = undefined;
  this.updateVisitor = new UpdateVisitor();
  this.origin = "";

  this.updateTree = function() {
    this.tree.accept(this.updateVisitor);
  };

};

FileTree.prototype.init = function(origin, aInitFiles) {
  this.origin = origin;
  this.tree = new Tree(origin);
  if (aInitFiles) {
    for(var i in aInitFiles) {
      this.tree.add(aInitFiles[i]);
    }
  }
};

FileTree.prototype.setTree = function(aFiles) {
  for(var i in aFiles) {
    this.tree.add(aFiles[i]);
  }
  this.updateTree();
};

FileTree.prototype.acceptVisitor = function(visitor) {
  this.tree.accept(visitor);
};

FileTree.prototype.find = function(aFilters) {
  var findVisitor = new FindVisitor(aFilters);
  this.tree.accept(findVisitor);
  return findVisitor.getResults();
};
