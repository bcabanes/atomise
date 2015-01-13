(function(angular) {
    'use strict';

    angular
        .module('app.viewer')
        .controller('viewer.GroupController', controller);

    controller.$inject = [
        'pattern.Factory',
        '$stateParams'
    ];

    function controller(pattern, $stateParams) {
        /* jshint validthis: true */
        var vm = this;
        vm.patterns = {};

        /**
         * Load the requested pattern group if setted
         */
        if($stateParams.hasOwnProperty('targets')) {
            var name = null,
                targets = null;

            name = 'atoms';
            targets = pattern.sorted()[$stateParams['targets']];

            vm.patterns[name] = targets;
        }
    }

})(angular);
