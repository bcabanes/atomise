(function(angular) {
    'use strict';

    angular
        .module('app.pattern')
        .directive('showPattern', directive);

    directive.$inject = ['$http'];

    function directive($http) {
        return {
            'restrict': 'E',
            'scope': {
                'patterns': '=',
                'group': '='
            },
            'templateUrl': '/assets/partials/pattern/directives/showPattern.html',
            'link': link
        };

        function link(scope, element, attrs) {

        }

    }

})(angular);
