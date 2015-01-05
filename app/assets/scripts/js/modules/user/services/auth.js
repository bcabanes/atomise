(function (angular) {
    'use strict';

    angular.module('app.user').service('user.AuthService', service);

    /* jshint validthis: true */
    function service() {
        var auth = JSON.parse(localStorage.getItem('auth.user')),
            authToken = JSON.parse(localStorage.getItem('auth.token'));

        this.user = user;
        this.token = token;
        this.login = login;
        this.logout = logout;
        this.check = check;

        function user(_user) {
            if (typeof _user !== 'undefined') {
                localStorage.setItem('auth.user',
                    JSON.stringify(auth = _user));
            }

            return angular.copy(auth);
        }

        function token(_token) {
            if (typeof _token !== 'undefined') {
                localStorage.setItem('auth.token',
                    JSON.stringify(authToken = _token));
            }

            return angular.copy(authToken);
        }

        function login(_user, _token) {
            user(_user); token(_token);
        }

        function logout() {
            user(null); token(null);
            localStorage.clear();
        }

        function check() {
            return !! user();
        }
    }
})(angular);
