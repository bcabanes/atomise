(function (angular) {
    'use strict';

    angular.module('app.user').controller('user.LoginController', controller);

    controller.$inject = [
        '$state',
        'api.ApiService',
        'user.AuthService',
        'user.User'
    ];

    /* jshint validthis: true */
    function controller($state, ApiService, AuthService, User) {
        var vm = this;
        vm.user = new User();
        vm.login = login;

        function login() {
            ApiService.post('/user/login', {
                'username': vm.user.username,
                'password': vm.user.password
            }).then(function (response) {
                if (response.data.user && response.data.token) {
                    AuthService.login(new User(response.data.user), response.data.token);

                    return $state.go('layout.user.login');
                }

                vm.errors = response.data.errors;
                vm.validations = response.data.validations;
            });
        }
    }
})(angular);
