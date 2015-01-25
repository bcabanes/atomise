(function(angular) {
    'use strict';

    angular
        .module('app.viewer')
        .directive('resizeInputs', directive);

    directive.$inject = ['$rootScope'];

    function directive($rootScope) {
        return {
            'restrict': 'E',
            'scope': {},
            'templateUrl': '/assets/partials/viewer/directives/resizeInputs.html',
            'link': link
        };

        function link(scope, element, attrs) {

            var clientWidth = document.body.clientWidth,
                maxViewportWidth = 2600, // Maxiumum Size for Viewport
                minViewportWidth = 240; // Minimum Size for Viewport

            /**
             * Handle input's interaction
             */
            scope.$watch('resizePixel', handleInput);
            function handleInput(value) {
                if(maxViewportWidth > value && minViewportWidth < value) {
                    sendEvent(value);
                }
            }

            /**
             * Disco mode
             */
            scope.discoMode = function() {};

            /**
             * Set small
             */
            scope.setSmall = function() {
                sendEvent(randomize(minViewportWidth, 500));
            };

            /**
             * Set medium
             */
            scope.setMedium = function() {
                sendEvent(randomize(500, 800));
            };

            /**
             * Set large
             */
            scope.setLarge = function() {
                sendEvent(randomize(800, 1300));
            };

            /**
             * Set full
             */
            scope.setFull = function() {
                sendEvent(clientWidth);
            };

            /**
             * Send event on the $rootScope
             */
            function sendEvent(value) {
                $rootScope.$emit('viewportWidth', value);
            }

        }

        /**
         * HELPERS
         */

        /**
         * Returns a random number between min and max
         * @param  {int} min The minimal integer
         * @param  {int} max The maximal integer
         * @return {int}     The result
         */
        function randomize(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
    }

})(angular);
