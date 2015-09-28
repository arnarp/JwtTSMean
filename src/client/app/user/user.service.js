var app;
(function (app) {
    var user;
    (function (user) {
        'use strict';
        var UserService = (function () {
            function UserService($http, $q, exception, logger, authService, $window) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.exception = exception;
                this.logger = logger;
                this.authService = authService;
                this.$window = $window;
                this.register = function (email, password) {
                    return _this.$http
                        .post('/api/register', { email: email, password: password })
                        .then(_this.extractData)
                        .then(_this.setToken)
                        .then(_this.alertRegisteredSuccess)
                        .catch(_this.onRegisterRejected);
                };
                this.login = function (email, password) {
                    return _this.$http
                        .post('/api/login', { email: email, password: password })
                        .then(_this.extractData)
                        .then(_this.setToken)
                        .then(_this.alertLoginSuccess)
                        .catch(_this.onLoginRejected);
                };
                this.googleLogin = function () {
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
                    var popup = _this.$window.open(url, '', options);
                    _this.$window.focus();
                    _this.$window.addEventListener('message', function (event) {
                        if (event.origin === _this.$window.location.origin) {
                            console.log(event.data);
                            popup.close();
                            var code = event.data;
                            _this.$http.post('api/auth/google', {
                                code: code,
                                clientId: clientId,
                                redirectUri: _this.$window.location.origin
                            });
                        }
                    });
                };
                this.extractData = function (response) { return response.data; };
                this.alertRegisteredSuccess = function (resp) {
                    _this.logger.success("You, " + resp.user.email + ", are now registered", resp, 'Success');
                    return resp;
                };
                this.alertLoginSuccess = function (resp) {
                    _this.logger.success(resp.user.email + " have been logged in", resp, 'Success');
                    return resp;
                };
                this.setToken = function (resp) {
                    _this.authService.setToken(resp.token);
                    return resp;
                };
                this.onRegisterRejected = function (resp) {
                    var msg = resp.data.description;
                    var reason = 'post register user failed.';
                    _this.exception.catcher(msg)(reason);
                    return _this.$q.reject(msg);
                };
                this.onLoginRejected = function (resp) {
                    var msg = resp.data.description;
                    var reason = 'login failed.';
                    _this.exception.catcher(msg)(reason);
                    return _this.$q.reject(msg);
                };
            }
            UserService.$inject = [
                '$http', '$q', 'exception', 'logger', 'authService', '$window'
            ];
            return UserService;
        })();
        user.UserService = UserService;
        angular
            .module('app.user')
            .service('userService', UserService);
    })(user = app.user || (app.user = {}));
})(app || (app = {}));
//# sourceMappingURL=user.service.js.map