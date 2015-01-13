(function(angular) {
    'use strict';

    angular
        .module('app.viewer')
        .controller('viewer.IndexController', controller);

    controller.$inject = [
        'pattern.Factory',
        '$stateParams'
    ];

    function controller(pattern, $stateParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.patterns = pattern.sorted();

    }

})(angular);
