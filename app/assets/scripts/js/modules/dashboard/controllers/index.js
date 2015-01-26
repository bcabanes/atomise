(function(angular) {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('dashboard.IndexController', controller);

    controller.$inject = ['pattern.Factory'];

    function controller(pattern) {
        /* jshint validthis: true */
        var vm = this;

        /**
         * Load all patterns available by default
         */
        vm.patterns = pattern.sorted();

        /**
         * Chart
         */
        vm.chartData = {
            series: [],
            data: [{
                x: 'Atoms',
                y: [vm.patterns.atoms.length]
            }, {
                x: 'Molecules',
                y: [vm.patterns.molecules.length],
                tooltip: 'Total molecules'
            }, {
                x: 'Organisms',
                y: [vm.patterns.organisms.length],
                tooltip: 'Total organisms'
            }, {
                x: 'Templates',
                y: [vm.patterns.templates.length],
                tooltip: 'Total templates'
            }, {
                x: 'Pages',
                y: [vm.patterns.pages.length]
            }]
        };


        vm.chartConfig = {
            title: 'Patterns',
            tooltips: true,
            labels: false,
            mouseover: function() {},
            mouseout: function() {},
            click: function() {},
            legend: {
                display: true,
                //could be 'left, right'
                position: 'right'
            }
        };

    }

})(angular);
