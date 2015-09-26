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
            .value('config', config);
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
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=config.js.map