namespace app.core {
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
    function httpInterceptorConfig($httpProvider: ng.IHttpProvider) {
        $httpProvider.interceptors.push('authHttpInterceptor');
    }

    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr: any) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    configure.$inject = ['$logProvider', 'exceptionHandlerProvider'];
    function configure($logProvider: any, exceptionHandlerProvider: any) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }

    googleAuthConfig.$inject = ['$window'];
    function googleAuthConfig($window: ng.IWindowService) {
        var params = $window.location.search.substring(1);
        if (params &&
            $window.opener &&
            $window.opener.location.origin === $window.location.origin) {
            var pair = params.split('=');
            var code = decodeURIComponent(pair[1]);
            $window.opener.postMessage(code, $window.location.origin);
        }
    }
}