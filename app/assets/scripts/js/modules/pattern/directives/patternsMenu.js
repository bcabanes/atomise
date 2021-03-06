/* global jQuery */
(function(angular) {

    angular
        .module('app.pattern')
        .directive('patternsMenu', directive);

    directive.$inject = [];

    function directive() {
        return {
            'restrict': 'E', // Only matches element name: <patterns-menu></patterns-menu>
            'scope': {
                'patternsTree': '='
            },
            'templateUrl': 'assets/partials/pattern/directives/patternsMenu.html',
            'link': link
        };

        function link(scope, element, attrs){
            var visitor = new BuildMenuVisitor(),
                patternsTree = scope.patternsTree;

            patternsTree.acceptVisitor(visitor);
            scope.navigation = visitor.getMenu();

            element.append(scope.navigation);

            /**
             * Menu's interactions
             */
            element
                .children('.atomise--acc-handle')
                .on('click', handleDropdown);


            function handleDropdown(event) {
                var target = angular.element(event.target);
                var dropdown = target.next();


                if(target.hasClass('atomise--active')) {
                    target.removeClass('atomise--active');
                }else{
                    target.addClass('atomise--active');
                }

                if(dropdown.hasClass('atomise--active')) {
                    dropdown.removeClass('atomise--active');
                }else{
                    dropdown.addClass('atomise--active');
                }
            }
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
                this.menu += '<li><a class="atomise--nav-loadable" href="viewer/item/'+node.getPath().replace('/', '--').replace('.', '---')+'">'+capitaliseFirstLetter(node.getName())+'</a>';
            } else {
                this.menu += '<li class="atomise--has-dropdown atomise--nav-'+node.getName().toLowerCase()+'"><a class="atomise--acc-handle" href="#">'+node.getName().toUpperCase()+'</a>';
            }
        };

        BuildMenuVisitor.prototype.end = function(node) {
            this.menu += '</li>';
        };

        BuildMenuVisitor.prototype.visitBeforeSons = function(node) {
            this.depth += 1;
            this.menu += '<ul class="atomise--dropdown">';
            if(this.depth < 2) {
                this.menu += '<li><a class="atomise--nav-view-all atomise--nav-loadable" href="viewer/group/'+node.getPath().replace('/', '--')+'">View all</a></li>';
            }
        };

        BuildMenuVisitor.prototype.visitAfterSons = function(node) {
            this.depth -= 1;
            this.menu += '</ul>';
        };

        BuildMenuVisitor.prototype.getMenu = function() {
            return '<ul class="atomise--nav-list">'+this.menu+'</ul>';
        };

})(angular);
