(function(angular) {
    'use strict';

    angular
        .module('app.layout')
        .controller('layout.HeaderController', controller);

    controller.$inject = ['pattern.Factory'];

    function controller(pattern) {
        /* jshint validthis: true */
        var vm = this;
        vm.showNavigationPanel = false;

        /**
         * Get the pattern tree to buil the header menu
         */
        vm.patternsTree = pattern.getTree();

    }

})(angular);
