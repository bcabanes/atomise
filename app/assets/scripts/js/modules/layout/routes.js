(function (angular) {
    'use strict';

    angular.module('app.layout').config(config);

    config.$inject = [
        '$locationProvider',
        '$urlRouterProvider',
        '$stateProvider',
        'core.Constants'
    ];

    function config($locationProvider, $urlRouterProvider, $stateProvider, Constants) {
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise(function () {
            return (localStorage.getItem('locale') ||
                Constants.LOCALE) + '/';
        });

        $stateProvider.state('layout', {
            'url': '/{locale:(?:' + Constants.LOCALES.join('|') + ')?}',
            'views': {
                'header@': {
                    'templateUrl': '/assets/partials/layout/header.html'
                }
            },
            /**
             * Wait until the factory has loaded
             * the json file to proceed with the route's controller
             */
            'resolve': {
                patternResources: 'pattern.Factory',
                patterns: function(patternResources){
                    return patternResources.promise;
                }
            }
        });
    }
})(angular);
