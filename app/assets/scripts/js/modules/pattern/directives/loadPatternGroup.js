(function(angular) {
    'use strict';

    angular
        .module('app.pattern')
        .directive('loadPatternGroup', directive);

    directive.$inject = [];

    function directive() {
        return {
            'restrict': 'E',
            'scope': {
                'patterns': '='
            },
            'templateUrl': '/assets/partials/pattern/directives/loadPatternGroup.html',
            'link': link
        };

        function link(scope, element, attrs) {
            scope.groups = getGroups();

            function getGroups() {
                var groups = [];
                for(var i in scope.patterns) {
                    groups.push(i);
                }
                return groups;
            }

        }
    }

})(angular);
