(function (angular) {
    'use strict';

    angular.module('app.user').config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {
        $stateProvider.state('layout.user', {
            'url': '/user',
            'abstract': true
        });

        $stateProvider.state('layout.user.login', {
            'url': '/login',
            'views': {
                '@': {
                    'controllerAs': 'vm',
                    'controller': 'user.LoginController',
                    'templateUrl': '/assets/partials/user/login.html'
                }
            }
        });

        $stateProvider.state('layout.user.logout', {
            'url': '/logout',
            'views': {
                '@': {
                    'controllerAs': 'vm',
                    'controller': 'user.LogoutController'
                }
            }
        });
    }
})(angular);
