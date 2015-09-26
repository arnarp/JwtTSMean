namespace app.core {
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
}