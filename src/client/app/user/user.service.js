var app;
(function (app) {
    var user;
    (function (user) {
        'use strict';
        var UserService = (function () {
            function UserService($http, $q, exception, logger, authService) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.exception = exception;
                this.logger = logger;
                this.authService = authService;
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
                '$http', '$q', 'exception', 'logger', 'authService'
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