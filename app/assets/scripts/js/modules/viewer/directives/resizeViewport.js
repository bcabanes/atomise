(function(angular) {
    'use strict';

    angular
        .module('app.viewer')
        .directive('resizeViewport', directive);

    directive.$inject = ['$rootScope'];

    function directive($rootScope) {
        return {
            'restrict': 'A',
            'scope': {},
            'link': link
        };

        function link(scope, element, attrs) {

            /**
             * Setting variables
             */
            var defaultWidth = window.width;

            /**
             * Watch for changes
             */
            $rootScope.$on('viewportWidth', setWidth);

            /**
             * Set viewport width with new value
             */
            function setWidth(event, value) {
                element[0]
                    .style
                    .width = value + 'px';
            }
        }
    }

})(angular);
