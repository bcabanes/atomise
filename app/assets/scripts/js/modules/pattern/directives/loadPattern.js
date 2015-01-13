/* global Mustache */
(function(angular) {
    'use strict';

    angular
    .module('app.pattern')
    .directive('loadPattern', directive);

    directive.$inject = ['$http', '$sce', '$q'];

    function directive($http, $sce, $q) {
        return {
            'restrict': 'E',
            'scope': {
                'path': '='
            },
            'templateUrl': '/assets/partials/pattern/directives/loadPattern.html',
            'link': link
        };

        function link(scope, element, attrs) {
            scope.template = '';
            scope.templateTemp = '';
            scope.jsonPath = scope.path.split('.')[0]+'.json';
            scope.settings = {};

            scope.templatePromise = $q.defer();
            scope.settingsPromise = $q.defer();

            $http.get('/sources/_patterns/' + scope.path)
                .success(function(data) {
                    scope.templateTemp = data;
                    scope.templatePromise.resolve();
                })
                .error(function() {
                    console.error('Error: ', 'The pattern can not be found.');
                });

            $http.get('/sources/_patterns/' + scope.jsonPath)
                .success(function(data) {
                    scope.settings = data;
                    scope.settingsPromise.resolve();
                })
                .error(function() {
                    scope.settingsPromise.resolve();
                    console.info('Notice: ', 'The settings\' pattern can not be found.');
                });

            /**
             * Wait all promises to be resolved before
             * rendering template with settings.
             */
            $q.all([scope.templatePromise.promise, scope.settingsPromise.promise])
                .then(function() {
                    scope.template = $sce.trustAsHtml(rendering(scope.templateTemp, scope.settings));
                });

            function rendering(template, settings) {
                return Mustache.render(template, settings);
                // return template;
            }

        }

    }

})(angular);
