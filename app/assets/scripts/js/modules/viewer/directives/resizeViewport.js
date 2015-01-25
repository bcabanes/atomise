(function(angular) {

    angular
        .module('app.viewer')
        .directive('resizeViewport', directive);

    directive.$inject = [];

    function directive() {
        return {
            'restrict': 'A',
            'scope': {
                'width': '@'
            },
            'link': link
        };

        function link(scope, element, attrs) {

            /**
             * Setting variables
             */
            var defaultWidth = (attrs.width != null) ? attrs.width: window.width;

            /**
             * Watch for changes
             */
            attrs.$observe('width',setWidth);

            /**
             * Set viewport width with new value
             */
            function setWidth(value) {
                element[0]
                    .style
                    .width = value + 'px';
            }
        }
    }

})(angular);
