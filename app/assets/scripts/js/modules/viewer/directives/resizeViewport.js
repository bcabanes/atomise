(function(angular) {

    angular
        .module('app.viewer')
        .directive('resizeViewport', directive);

    directive.$inject = [];

    function directive() {
        return {
            'restrict': 'A',
            'scope': {},
            'link': link
        };

        function link(scope, element, attrs) {

            /**
             * Setting variables
             */
            var defaultWidth = (attrs.resizeViewport != null)? attrs.resizeViewport: window.width;
            setWidth(defaultWidth);

            /**
             * Watch for changes
             */
            scope.$watch(attrs.resizeViewport, setWidth);

            /**
             * Setting viewport width with the value given
             */
            function setWidth(value) {
                element[0]
                    .style
                    .width = value + 'px';
            }
        }
    }

})(angular);
