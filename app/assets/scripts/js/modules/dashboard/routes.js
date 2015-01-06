(function(angular) {
    'user strict';

    angular.module('app.dashboard').config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider, pattern) {
        $stateProvider.state('layout.dashboard', {
            'url': '/dashboard',
            'abstract': true
        });

        $stateProvider.state('layout.dashboard.index', {
            'url': '/',
            'views': {
                '@': {
                    'controllerAs': 'vm',
                    'controller': 'dashboard.IndexController',
                    'templateUrl': '/assets/partials/dashboard/index.html'
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
