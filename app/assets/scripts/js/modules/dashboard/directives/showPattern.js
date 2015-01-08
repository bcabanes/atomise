(function(angular) {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('showPattern', directive);

    directive.$inject = ['$http'];

    function directive($http) {
        return {
            'restrict': 'E',
            'scope': {
                'patterns': '=',
                'group': '='
            },
            'templateUrl': '/assets/partials/dashboard/directives/showPattern.html',
            'link': link
        };

        function link(scope, element, attrs) {

        }

    }

})(angular);
