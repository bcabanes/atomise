(function (angular) {
    'use strict';

    angular.module('app.lang').run(run);

    run.$inject = [
        '$rootScope',
        '$stateParams',
        '$translate',
        'core.Constants'
    ];

    function run($rootScope, $stateParams, $translate, Constants) {
        $rootScope.$on('$stateChangeSuccess', function (event, state) {
            if ( ! $stateParams.locale) { $stateParams.locale = Constants.LOCALE; }
            localStorage.setItem('locale', $stateParams.locale);
            $translate.use($stateParams.locale);
        });
    }
})(angular);
