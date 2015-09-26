var app;
(function (app) {
    var core;
    (function (core) {
        'use strict';
        var TokenAuthService = (function () {
            function TokenAuthService($window) {
                var _this = this;
                this.$window = $window;
                this.tokenKey = 'userToken';
                this.getToken = function () {
                    if (_this.cachedToken === undefined) {
                        _this.cachedToken = _this.storage.getItem(_this.tokenKey);
                    }
                    return _this.cachedToken;
                };
                this.isAuthenticated = function () {
                    return _this.getToken() !== null;
                };
                this.storage = $window.localStorage;
            }
            TokenAuthService.prototype.setToken = function (token) {
                this.cachedToken = token;
                this.storage.setItem(this.tokenKey, token);
            };
            TokenAuthService.prototype.removeToken = function () {
                this.cachedToken = null;
                this.storage.removeItem(this.tokenKey);
            };
            TokenAuthService.$inject = ['$window'];
            return TokenAuthService;
        })();
        core.TokenAuthService = TokenAuthService;
        angular
            .module('app.core')
            .service('authService', TokenAuthService);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=authService.js.map