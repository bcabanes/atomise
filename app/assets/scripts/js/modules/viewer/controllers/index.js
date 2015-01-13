(function(angular) {
    'use strict';

    angular
        .module('app.viewer')
        .controller('viewer.IndexController', controller);

    controller.$inject = ['pattern.Factory'];

    function controller(pattern) {
        /* jshint validthis: true */
        var vm = this;

        /**
         * Load all patterns available by default
         */
        vm.patterns = pattern.sorted();
    }

})(angular);
