(function(angular) {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('dashboard.IndexController', controller);

    controller.$inject = ['pattern.Factory'];

    function controller(pattern) {
        /* jshint validthis: true */
        var vm = this;

        vm.patternsTree = pattern.getTree();

        /**
         * Load all patterns available by default
         */
        vm.patterns = pattern.sorted();
    }

})(angular);
