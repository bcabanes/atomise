/* global Mustache */
(function(angular) {
    'use strict';

    angular
        .module('app.pattern')
        .directive('loadPattern', directive);

    directive.$inject = [
        '$http',
        '$sce',
        '$q',
        'core.Constants',
        '$timeout'
    ];

    function directive($http, $sce, $q, constants, $timeout) {
        return {
            'restrict': 'E',
            'scope': {
                'path': '='
            },
            'templateUrl': '/assets/partials/pattern/directives/loadPattern.html',
            'link': link
        };

        function link(scope, element, attrs) {
            scope.template = '';
            scope.templateTemp = '';
            scope.jsonPath = scope.path.split('.').shift()+'.json';
            scope.settings = {};

            scope.templatePromise = $q.defer();
            scope.settingsPromise = $q.defer();

            /**
             * Load mustache template
             */
            $http.get('/sources/_patterns/' + scope.path)
                .success(function(data) {
                    scope.templateTemp = data;
                    scope.templatePromise.resolve();
                })
                .error(function() {
                    console.error('Error: ', 'The pattern can not be found.');
                });

            /**
             * Load associated json settings
             */
            $http.get('/sources/_patterns/' + scope.jsonPath)
                .success(function(data) {
                    scope.settings = data;
                    scope.settingsPromise.resolve();
                })
                .error(function() {
                    scope.settingsPromise.resolve();
                    console.info('Notice: ', 'The settings\' pattern can not be found.');
                });

            /**
             * Wait all promises to be resolved before
             * rendering template with settings.
             */
            $q.all([scope.templatePromise.promise, scope.settingsPromise.promise])
                .then(function() {
                    scope.template = $sce.trustAsHtml(rendering(scope.templateTemp, scope.settings));
                    // Inject content into the iframe
                    iframeInject();
                });

            function rendering(template, settings) {
                return Mustache.render(template, settings);
                // return template;
            }

            /**
             * Inject content into an iframe
             * TODO: Refact and see for sandboxed iframe with seamless argument
             */
            function iframeInject() {
                var linkCSS = '<link rel="stylesheet" href="'+constants['CSSFile']+'">';
                var iframe = element.find('iframe')[0];
                var iframeContent = iframe.contentWindow.document;

                /**
                 * Iframe creation
                 */
                iframeContent.open();
                iframeContent.write(linkCSS);
                iframeContent.close();

                /**
                 * Injecting custom content
                 */
                iframeContent.body.innerHTML = scope.template;

                /**
                 * Setting height accordingly to the content
                 */
                $timeout(function() {
                    iframe.height = iframeContent.body.scrollHeight + 'px';
                    iframe.width = iframeContent.body.scrollWidth + 'px';
                }, 200);
            }

            /**
             * Show/hide template markup
             */
            scope.templateMarkupDisplay = function() {
                element
                    .children()
                    .eq(2)
                    .toggleClass('atomise--show');
            };

        }

    }

})(angular);
