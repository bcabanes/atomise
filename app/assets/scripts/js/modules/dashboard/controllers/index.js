(function(angular) {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('dashboard.IndexController', controller);

    controller.$inject = ['pattern.Factory'];

    function controller(pattern) {
        /* jshint validthis: true */
        var vm = this;

console.log('this is dashboard index controller');
console.log('availables pattern', pattern.get());

    }

})(angular);
