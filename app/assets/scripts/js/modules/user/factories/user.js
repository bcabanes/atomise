(function (angular) {
    'use strict';

    angular.module('app.user').factory('user.User', factory);

    function factory() {
        return function (data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
        };
    }
})(angular);
