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

        $urlRouterProvider.otherwise('/dashboard/');

        $stateProvider.state('layout', {
            'abstract': true,
            'views': {
                'header@': {
                    'controllerAs': 'vm',
                    'controller': 'layout.HeaderController',
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
