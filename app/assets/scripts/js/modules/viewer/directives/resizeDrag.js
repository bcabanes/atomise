(function(angular) {
    'use strict';

    angular
        .module('app.viewer')
        .directive('resizeDrag', directive);

    directive.$inject = ['$rootScope'];

    function directive($rootScope) {
        return {
            'restrict': 'E',
            'scope': {},
            'templateUrl': '/assets/partials/viewer/directives/resizeDrag.html',
            'link': link
        };

        function link(scope, element, attrs) {
            var startX = 0, x = 0;

            element.on('mousedown', drag);
            function drag(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                angular.element(document).on('mousemove', mousemove);
                angular.element(document).on('mouseup', mouseup);
            }

            function mousemove(event) {
                x = event.pageX - startX;

                var eventInfos = {
                    'type': 'drag',
                    'value' : x
                };
                $rootScope.$emit('viewportWidth', eventInfos);
            }

            function mouseup() {
                angular.element(document).off('mousemove', mousemove);
                angular.element(document).off('mouseup', mouseup);
            }
        }
    }

})(angular);
