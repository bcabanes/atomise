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

        $stateProvider.state('layout.viewer.group', {
            'url': '/group/*targets',
            'views': {
                '@': {
                    'controllerAs': 'vm',
                    'controller': 'viewer.GroupController',
                    'templateUrl': '/assets/partials/viewer/group.html'
                }
            }
        });

        $stateProvider.state('layout.viewer.item', {
            'url': '/item/*target',
            'views': {
                '@': {
                    'controllerAs': 'vm',
                    'controller': 'viewer.ItemController',
                    'templateUrl': '/assets/partials/viewer/item.html'
                }
            }
        });
    }

})(angular);
