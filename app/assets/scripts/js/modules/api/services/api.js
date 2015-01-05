(function (angular) {
    'use strict';

    angular.module('app.api').service('api.ApiService', service);

    service.$inject = [
        '$http',
        'core.Constants'
    ];

    /* jshint validthis: true */
    function service($http, Constants) {
        this.get = get;
        this.post = post;
        this.put = put;
        this.patch = patch;
        this.remove = remove;

        function send(config) {
            config.url = Constants.API_URL + config.url;

            return $http(config);
        }

        function get(url, config) {
            config = config || {};
            config.url = url;
            config.method = 'GET';

            return send(config);
        }

        function post(url, data, config) {
            config = config || {};
            config.url = url;
            config.data = data;
            config.method = 'POST';

            return send(config);
        }

        function put(url, data, config) {
            config = config || {};
            config.url = url;
            config.data = data;
            config.method = 'PUT';

            return send(config);
        }

        function patch(url, data, config) {
            config = config || {};
            config.url = url;
            config.data = data;
            config.method = 'PATCH';

            return send(config);
        }

        function remove(url, config) {
            config = config || {};
            config.url = url;
            config.method = 'DELETE';

            return send(config);
        }
    }
})(angular);
