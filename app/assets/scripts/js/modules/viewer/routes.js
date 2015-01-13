(function(angular) {
    'use strict';

    angular
        .module('app.viewer')
        .config(config);

    config.$inject =  ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('layout.viewer', {
            'url': '/viewer',
            'abstract': true
        });

        $stateProvider.state('layout.viewer.index', {
            'url': '/',
            'views': {
                '@': {
                    'controllerAs': 'vm',
                    'controller': 'viewer.IndexController',
                    'templateUrl': '/assets/partials/viewer/index.html'
                }
            }
        });
    }

})(angular);
