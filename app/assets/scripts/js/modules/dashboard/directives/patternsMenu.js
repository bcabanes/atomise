(function(angular) {

    angular
        .module('app.dashboard')
        .directive('patternsMenu', directive);

    directive.$inject = [];

    function directive() {
        return {
            'restrict': 'E', // Only matches element name: <patterns-menu></patterns-menu>
            'scope': {
                'patternsTree': '='
            },
            'templateUrl': 'assets/partials/dashboard/directives/patternsMenu.html',
            'link': link
        };

        function link(scope, element, attrs){
            var visitor = new BuildMenuVisitor(),
                patternsTree = scope.patternsTree;

            patternsTree.acceptVisitor(visitor);
            scope.navigation = visitor.getMenu();
            
            element.append(scope.navigation);
        }
    }


    /**
     * HELPERS
     */
    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * Build the navigation menu
     */
    function BuildMenuVisitor() {
        this.menu = '';
        this.depth = 0;
    }
        BuildMenuVisitor.prototype = new Visitor();

        BuildMenuVisitor.prototype.begin = function(node) {
            if (node.isLeaf()) {
                this.menu += '<li><a class="sg--nav-loadable" href="#'+node.getPath()+'">'+capitaliseFirstLetter(node.getName())+'</a>';
            } else {
                this.menu += '<li class="has-dropdown not-click sg--nav-'+node.getName().toLowerCase()+'"><a class="sg--acc-handle" href="#">'+node.getName().toUpperCase()+'</a>';
            }
        };

        BuildMenuVisitor.prototype.end = function(node) {
            this.menu += '</li>';
        };

        BuildMenuVisitor.prototype.visitBeforeSons = function(node) {
            this.depth += 1;
            this.menu += '<ul class="dropdown">';
            this.menu += '<li><a class="sg--nav-view-all sg--nav-loadable" href="#'+node.getPath()+'">View all</a></li>';
        };

        BuildMenuVisitor.prototype.visitAfterSons = function(node) {
            this.depth -= 1;
            this.menu += '</ul>';
        };

        BuildMenuVisitor.prototype.getMenu = function() {
            return '<ul class="left">'+this.menu+'</ul>';
        };

})(angular);
