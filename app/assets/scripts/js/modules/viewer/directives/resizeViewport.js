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
            var resizeHandleWidth = 10,
                defaultWidth = window.innerWidth,
                minWidth = 221;

            setWidth(false, defaultWidth);

            /**
             * Watch for changes
             */
            $rootScope.$on('viewportWidth', prepareSetWidth);

            /**
             * Prepare the value for setting the width
             */
            function prepareSetWidth(event, data) {
                 element.removeClass('atomise--animate');

                 if(data.type === 'input'){
                     element.addClass('atomise--animate');
                     setWidth(data.value);

                     $rootScope.$emit('viewportUpdateInput', data.value);
                 }else if(data.type === 'drag'){
                     var value = defaultWidth + data.value;
                     setWidth(value);

                     $rootScope.$emit('viewportUpdateInput', parseInt(value - resizeHandleWidth));
                 }else{
                     element.addClass('atomise--animate');
                     setWidth(data);

                     $rootScope.$emit('viewportUpdateInput', data);
                 }
             }

            /**
             * Set viewport width with new value
             */
            function setWidth(value) {
                if(value > minWidth) {
                    element[0]
                        .style
                        .width = parseInt(value - resizeHandleWidth) + 'px';
                }
            }
        }
    }

})(angular);
