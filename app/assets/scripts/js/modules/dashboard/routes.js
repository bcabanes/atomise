(function(angular) {
    'user strict';

    angular.module('app.dashboard').config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {
        $stateProvider.state('layout.dashboard', {
            'url': '/dashboard',
            'abstract': true
        });

        $stateProvider.state('layout.dashboard.index', {
            'url': '/index',
            'views': {
                '@': {
                    'controllerAs': 'vm',
                    'controller': 'dashboard.IndexController',
                    'templateUrl': '/assets/partials/dashboard/index.html'
                }
            }
        })
    }

})(angular);
