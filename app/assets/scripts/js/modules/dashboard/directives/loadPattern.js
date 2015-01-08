/* global Mustache */
(function(angular) {
    'use strict';

    angular
    .module('app.dashboard')
    .directive('loadPattern', directive);

    directive.$inject = ['$http', '$sce'];

    function directive($http, $sce) {
        return {
            'restrict': 'E',
            'scope': {
                'path': '='
            },
            'templateUrl': '/assets/partials/dashboard/directives/loadPattern.html',
            'link': link
        };

        function link(scope, element, attrs) {
            scope.template = '';

            $http.get('/sources/_patterns/' + scope.path)
                .success(function(data) {
                    scope.template = $sce.trustAsHtml(rendering(data));
                })
                .error(function() {
                    console.error('Error: ', 'The pattern can not be found.');
                });


            function rendering(template) {
                // return Mustache.render(template);
                return template;
            }

        }

    }

})(angular);
