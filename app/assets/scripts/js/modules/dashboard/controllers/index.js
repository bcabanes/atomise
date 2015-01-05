(function(angular) {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('dashboard.IndexController', controller);

    controller.$inject = [];

    function controller() {
        /* jshint validthis: true */
        var vm = this;

        console.log('this is dashboard index controller');
    }

})(angular);
