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
            var resizeHandleWidth = 10;
            var defaultWidth = window.innerWidth;

            setWidth(false, defaultWidth);

            /**
             * Watch for changes
             */
            $rootScope.$on('viewportWidth', setWidth);

            /**
             * Set viewport width with new value
             */
            function setWidth(event, data) {
                if(data.type === 'input'){
                    element[0]
                        .style
                        .width = parseInt(data.value - resizeHandleWidth) + 'px';

                    $rootScope.$emit('viewportUpdateInput', data.value);
                }else if(data.type === 'drag'){
                    var value = defaultWidth + data.value;
                    element[0]
                        .style
                        .width = parseInt(value - resizeHandleWidth) + 'px';

                    $rootScope.$emit('viewportUpdateInput', parseInt(value - resizeHandleWidth));
                }else{
                    element[0]
                        .style
                        .width = parseInt(data - resizeHandleWidth) + 'px';

                    $rootScope.$emit('viewportUpdateInput', data);
                }
            }
        }
    }

})(angular);
