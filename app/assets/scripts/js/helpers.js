/**
 * FileTree
 * Build file tree from data
 */


/**
 * Node
 * Look over the node and set things ...
 */
function Node(value) {
    this.value = './';
    this.path = undefined;
    this.extension = undefined;
    this.type = undefined;
    this.name = undefined;
    this.sons = [];

    if(value !== undefined) {
        this.value = value;
    }
}

    /**
     * Get node value
     * @return {string}
     */
    Node.prototype.getValue = function() {
        return this.value;
    };

    /**
     * Get node path
     * @return {string}
     */
    Node.prototype.getPath = function() {
        return this.path;
    };

    /**
     * Set node path
     * @param {string}
     */
    Node.prototype.setPath = function(path) {
        this.path = path;
    };

    /**
     * Get node extension
     * @return {string}
     */
    Node.prototype.getExtension = function() {
        return this.extension;
    };

    /**
     * Set node extension
     * @param {string}
     */
    Node.prototype.setExtension = function(extension) {
        this.extension = extension;
    };

    /**
     * Get node type
     * @return {string}
     */
    Node.prototype.getType = function() {
        return this.type;
    };

    /**
     * Set node type
     * @param {string}
     */
    Node.prototype.setType = function(type) {
        this.type = type;
    };

    /**
     * Get node name
     * @return {string}
     */
    Node.prototype.getName = function() {
        return this.name;
    };

    /**
     * Set node name
     * @param {string}
     */
    Node.prototype.setName = function(name) {
        this.name = name;
    };

    /**
     * Get node son with the name given
     * @param {string} name
     * @return {object}
     */
    Node.prototype.getSon = function(name) {
        for(var i in this.sons) {
            if(this.sons[i].getValue() == name) {
                return this.sons[i];
            }
        }

        return false;
    };

    /**
     * Get node all sons
     * @return {array}
     */
    Node.prototype.getSons = function() {
        return this.sons;
    };

    /**
     * Add node sons
     * @param {object} aFiles
     */
    Node.prototype.add = function(aFiles) {
        if(aFiles.length !== 0) {
            var item = aFiles.shift();
            var son = this.getSon(item);
            if(son) {
                son.add(aFiles);
            } else {
                son = new Node(item);
                this.sons.push(son);
                son.add(aFiles);
            }
        }
    };

    /**
     * Detect it's a node's leaf
     * @return {boolean}
     */
    Node.prototype.isLeaf = function() {
        return this.sons.length === 0;
    };

    /**
     * Node accept visistor
     */
    Node.prototype.accept = function(visitor, isRoot) {
        var i;
        if(isRoot) {
            for(i in this.sons) {
                this.sons[i].accept(visitor);
            }
        } else {
            visitor.begin(this);
            if(!this.isLeaf()){
                visitor.visitBeforeSons(this);
                for(i in this.sons) {
                    this.sons[i].accept(visitor);
                }
                visitor.visitAfterSons(this);
            }
            visitor.end(this);
        }
    };

/**
 * Build tree function
 * @param {object} origin
 */
function Tree(origin) {
    this.root = new Node(origin);
    this.attributes = {};
}

    Tree.prototype.getRoot = function() {
        return this.root;
    };

    Tree.prototype.add = function(file) {
        var aFiles = file.split('/');
        this.root.add(aFiles);
    };

    Tree.prototype.accept = function(visitor) {
        this.root.accept(visitor, true);
    };

/**
 * Visitor
 * Visitor funtion to look over nodes
 */
function Visitor() {}

    Visitor.prototype.visitBeforeSons = function(node) {};
    Visitor.prototype.visitAfterSons = function(node) {};
    Visitor.prototype.begin = function(node) {};
    Visitor.prototype.end = function(node) {};

/**
 * Find Visitor
 */
function FindVisitor(aFilters) {
    this.results = [];
    this.filters = aFilters;
}
    /**
     * Get results
     * @return {object}
     */
    FindVisitor.prototype.getResults = function() {
        return this.results;
    };

    FindVisitor.prototype.visitBeforeSons = function(node) {};
    FindVisitor.prototype.visitAfterSons = function(node) {};

    FindVisitor.prototype.begin = function(node) {
        var bReturn = true;
        for(var i in this.filters) {
            var filter = this.filters[i];
            switch (filter.name) {
                case 'extensiion':
                    if(node.getExtension() !== filter.value) {
                        bReturn = false;
                    }
                    break;
                case 'type':
                    if(node.getType() !== filter.value) {
                        bReturn = false;
                    }
                    break;
                case 'path':
                    if (node.getPath().substr(0, filter.value.length) != filter.value) {
                        bReturn = false;
                    }
                    break;
            }
        }
        if(bReturn) {
            this.results.push({
                'name': node.getName(),
                'path': node.getPath(),
                'type': node.getType()
            });
        }
    };

    FindVisitor.prototype.end = function(node) {};

/**
 * Update Visitor
 */
function UpdateVisitor(originPath) {
    this.path = [];
    this.origin = originPath;

    this.computePath = function(node) {
        var path = '';
        if(this.origin) {
            path += this.origin + '/';
        }
        if(this.path.length) {
            path += this.path.join('/') + '/';
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
            return '';
        }

        return aFilePart.pop();
    };

    this.computeType = function(node) {
        var type;
        switch(node.getExtension()) {
            case false:
                type = 'directory';
                break;
            case 'mustache':
                type = 'mustache';
                break;
            default:
                type = 'file';
        }

        return type;
    };

    this.computeName = function(node) {
        var aFilePart = node.getValue().split('.');
        if(aFilePart.length > 1) {
            aFilePart.pop();
        }

        return aFilePart.join('.');
    };
}

    UpdateVisitor.prototype = new Visitor();

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

    UpdateVisitor.prototype.end = function(node) {};

/**
 * File Tree
 */
var FileTree = function() {
    this.tree = undefined;
    this.updateVisitor = new UpdateVisitor();
    this.origin = '';

    this.updateTree = function() {
        this.tree.accept(this.updateVisitor);
    };
};


        FileTree.prototype.init = function(origin, aInitFiles) {
            this.origin = origin;
            this.tree = new Tree(origin);
            if(aInitFiles) {
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
