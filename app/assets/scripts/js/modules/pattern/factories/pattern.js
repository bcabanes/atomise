(function(angular) {
    'use strict';

    angular
        .module('app.pattern')
        .factory('pattern.Factory', factory);

    factory.$inject = [
        '$http',
        '$q'
    ];

    function factory($http, $q, patterns) {
        var self = this;
        self.jsonUrl = '/sources/patterns.json';
        self.data = null;

        /**
         * Load the json file
         * @return {object} $promise
         */
        var promise = $http.get(self.jsonUrl).success(function(data){
            self.data = data;
        });

        /**
         * Return all patterns unsorted
         * @return {object} patterns unsorted
         */
        var getPatterns = function() {
            return self.data;
        };

        /**
         * Build pattern tree
         */
        var buildPatternTree = function() {

        };

        /**
         * Public interface
         */
        return {
            'promise': promise,
            'get': getPatterns
        }
    }

})(angular);
