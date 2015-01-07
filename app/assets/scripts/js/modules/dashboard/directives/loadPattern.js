(function(angular) {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('loadPattern', directive);

    directive.$inject = [];

    function directive() {
        return {
            'restrict': 'E',
            'scope': {
                'patterns': '='
            },
            'templateUrl': '/assets/partials/dashboard/directives/loadPattern.html',
            'link': link
        };

        function link(scope, element, attrs) {

        }
    }

})(angular);
