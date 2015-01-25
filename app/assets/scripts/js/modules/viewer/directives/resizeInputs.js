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

            scope.pixels = clientWidth;

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
                var eventInfos = {
                    'type': 'input',
                    'value' : randomize(minViewportWidth, 500)
                };
                sendEvent(eventInfos);
                scope.pixels = eventInfos.value;
            };

            /**
             * Set medium
             */
            scope.setMedium = function() {
                var eventInfos = {
                    'type': 'input',
                    'value' : randomize(500, 800)
                };
                sendEvent(eventInfos);
                scope.pixels = eventInfos.value;
            };

            /**
             * Set large
             */
            scope.setLarge = function() {
                var eventInfos = {
                    'type': 'input',
                    'value' : randomize(800, 1300)
                };
                sendEvent(eventInfos);
                scope.pixels = eventInfos.value;
            };

            /**
             * Set full
             */
            scope.setFull = function() {
                var eventInfos = {
                    'type': 'input',
                    'value' : clientWidth
                };
                sendEvent(eventInfos);
                scope.pixels = eventInfos.value;
            };

            /**
             * Send event on the $rootScope
             */
            function sendEvent(value) {
                $rootScope.$emit('viewportWidth', value);
            }

            /**
             * Update the input field
             * @param {object} event
             * @param {string} value
             */
            $rootScope.$on('viewportUpdateInput', updateInput);
            function updateInput(event, value) {
                scope.pixels = value;
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
