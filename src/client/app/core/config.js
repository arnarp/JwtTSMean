var app;
(function (app) {
    var core;
    (function (core) {
        'use strict';
        angular
            .module('app.core')
            .config(httpInterceptorConfig)
            .config(toastrConfig)
            .config(configure)
            .value('config', config)
            .run(googleAuthConfig);
        var config = {
            appErrorPrefix: '[helloWorld Error] ',
            appTitle: 'helloWorld'
        };
        httpInterceptorConfig.$inject = ['$httpProvider'];
        function httpInterceptorConfig($httpProvider) {
            $httpProvider.interceptors.push('authHttpInterceptor');
        }
        toastrConfig.$inject = ['toastr'];
        function toastrConfig(toastr) {
            toastr.options.timeOut = 4000;
            toastr.options.positionClass = 'toast-bottom-right';
        }
        configure.$inject = ['$logProvider', 'exceptionHandlerProvider'];
        function configure($logProvider, exceptionHandlerProvider) {
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
            exceptionHandlerProvider.configure(config.appErrorPrefix);
        }
        googleAuthConfig.$inject = ['$window'];
        function googleAuthConfig($window) {
            var params = $window.location.search.substring(1);
            if (params &&
                $window.opener &&
                $window.opener.location.origin === $window.location.origin) {
                var pair = params.split('=');
                var code = decodeURIComponent(pair[1]);
                $window.opener.postMessage(code, $window.location.origin);
            }
        }
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=config.js.map