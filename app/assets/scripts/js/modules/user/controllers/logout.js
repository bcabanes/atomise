(function (angular) {
    'use strict';

    angular.module('app.user').controller('user.LogoutController', controller);

    controller.$inject = [
        '$state',
        'api.ApiService',
        'user.AuthService'
    ];

    function controller($state, ApiService, AuthService) {
        ApiService.get('/user/logout').then(function () {
            AuthService.logout();

            return $state.go('layout.user.login');
        });
    }
})(angular);
