(function(angular) {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('loadPatternGroup', directive);

    directive.$inject = [];

    function directive() {
        return {
            'restrict': 'E',
            'scope': {
                'patterns': '='
            },
            'templateUrl': '/assets/partials/dashboard/directives/loadPatternGroup.html',
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
