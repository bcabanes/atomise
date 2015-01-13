(function(angular) {
    'use strict';

    angular
        .module('app.viewer')
        .controller('viewer.ItemController', controller);

    controller.$inject = [
        'pattern.Factory',
        '$stateParams'
    ];

    function controller(pattern, $stateParams) {
        /* jshint validthis: true */
        var vm = this;

        /**
         * Load the requested pattern if setted
         */
        if($stateParams.hasOwnProperty('target')) {
            var target = {};

            target.path = $stateParams.target
                                            .replace('--', '/')
                                            .replace('---', '.');
            target.name = target.path
                                    .split('.')
                                    .shift()
                                    .split('/')
                                    .slice(-1)
                                    .pop();

            vm.pattern = [target];
        }

    }

})(angular);
