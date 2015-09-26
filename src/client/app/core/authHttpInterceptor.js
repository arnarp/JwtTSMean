var app;
(function (app) {
    var core;
    (function (core) {
        'use strict';
        var AuthHttpInterceptor = (function () {
            function AuthHttpInterceptor(authService) {
                var _this = this;
                this.authService = authService;
                this.request = function (config) {
                    var token = _this.authService.getToken();
                    if (token !== null) {
                        config.headers['Authorization'] = "Bearer " + token;
                    }
                    return config;
                };
                this.response = function (response) {
                    return response;
                };
            }
            AuthHttpInterceptor.$inject = ['authService'];
            return AuthHttpInterceptor;
        })();
        core.AuthHttpInterceptor = AuthHttpInterceptor;
        angular
            .module('app.core')
            .service('authHttpInterceptor', AuthHttpInterceptor);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=authHttpInterceptor.js.map