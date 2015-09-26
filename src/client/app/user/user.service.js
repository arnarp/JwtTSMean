var app;
(function (app) {
    var user;
    (function (user) {
        'use strict';
        var UserService = (function () {
            function UserService($http, $q, exception, logger) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.exception = exception;
                this.logger = logger;
                this.register = function (email, password) {
                    return _this.$http.post('/api/register', { email: email, password: password })
                        .then(_this.alertSuccess)
                        .then(_this.success)
                        .catch(_this.onRejected);
                };
                this.success = function (response) { return response.data; };
                this.alertSuccess = function (resp) {
                    _this.logger.success("You, " + resp.data.user.email + ", are now registered", resp, 'Success');
                    return resp;
                };
                this.onRejected = function (resp) {
                    var msg = resp.data.description;
                    var reason = 'post register user failed.';
                    _this.exception.catcher(msg)(reason);
                    return _this.$q.reject(msg);
                };
            }
            UserService.$inject = [
                '$http', '$q', 'exception', 'logger'
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