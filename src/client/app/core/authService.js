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
                this.googleAuth = function () {
                    var clientId = '88579833395-a5p8a46ompaopj9ptvluf3v2pila71e5.apps.googleusercontent.com';
                    var endPoint = 'https://accounts.google.com/o/oauth2/auth';
                    var params = [
                        'response_type=code',
                        ("client_id=" + clientId),
                        ("redirect_uri=" + _this.$window.location.origin),
                        'scope=profile email'
                    ];
                    var url = endPoint + "?" + params.join('&');
                    var size = 500;
                    var width = "width=" + size;
                    var height = "height=" + size;
                    var left = "left=" + (_this.$window.outerWidth - size) / 2;
                    var top = "top=" + (_this.$window.outerHeight - size) / 2.5;
                    var options = width + "," + height + "," + left + "," + top;
                    _this.$window.open(url, '', options);
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