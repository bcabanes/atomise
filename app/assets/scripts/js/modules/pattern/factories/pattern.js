/* global FileTree */
(function(angular) {
    'use strict';

    angular
        .module('app.pattern')
        .factory('pattern.Factory', factory);

    factory.$inject = [
        '$http',
        '$q'
    ];

    function factory($http, $q) {
        var jsonUrl = '/sources/patterns.json',
            jsonData = null,
            patternsPath = '/sources/_patterns/',
            patternsTree;

        /**
         * Load the json file
         * @return {object} $promise
         */
        var promise = $http.get(jsonUrl).success(function(data){
            jsonData = data;
        });

        /**
         * Return the complete pattern Tree object
         * @return {object} patterns Tree
         */
        var getTree = function() {
            if(patternsTree === undefined){
                patternsTree = setTree();
            }
            return patternsTree;
        };

        /**
         * Build pattern tree
         */
        var setTree = function() {
            patternsTree = new FileTree();
            patternsTree.init('.', [
                'atoms',
                'molecules',
                'organisms',
                'templates',
                'pages'
            ]);
            patternsTree.setTree(jsonData);

            return patternsTree;
        };

        /**
         * Return all patters from the tree
         * @return {object} patterns
         */
        var getPatterns = function() {
            patternsTree = getTree();
            return patternsTree.find([{
                'name': 'extension',
                'value': 'mustache'
            }]);
        };

        /**
         * Return the template path by given the template's name
         * @return {string}
         */
        var getTemplatePath = function(name) {
            return patternsPath + name;
        };

        /**
         * Public interface
         */
        return {
            'promise': promise,
            'get': getPatterns,
            'getTree': getTree,
            'getPath': getTemplatePath
        };
    }

})(angular);
