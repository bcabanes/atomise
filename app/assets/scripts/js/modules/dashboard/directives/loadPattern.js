/* global Mustache */
(function(angular) {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('loadPattern', directive);

    directive.$inject = ['$http'];

    function directive($http) {
        return {
            'restrict': 'E',
            'scope': {
                'patterns': '='
            },
            'templateUrl': '/assets/partials/dashboard/directives/loadPattern.html',
            'link': link
        };

        function link(scope, element, attrs) {

            for(var category in scope.patterns) {
                element.append('<div class="atomise-'+ category +'"><h1>' + category + '</h1></div>');
                createPatterns(category, scope.patterns[category]);
            }

            function createPatterns(category, patterns) {
                for(var i in patterns) {
                    loadPattern('.atomise-' + category, patterns[i].name, patterns[i].path);
                }
            }

            function loadPattern(target, name, path) {
                $http.get('/sources/_patterns/' + path)
                    .success(function(data){
                        var html = '<div class="atomise-element name">';
                            html += '<h2 class="atomise-element-head">' + name + '</h2>';
                            html += renderTemplate(data);
                            html += '</div>';
                        element.find(target).append(html);
                    })
                    .error(function() {
                        console.error('Error: ', 'The pattern can not be found.');
                    });
            }

            function renderTemplate(template) {
                // return Mustache.render(template);
                return template;
            }
        }

    }

})(angular);
