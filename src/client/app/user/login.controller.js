var app;
(function (app) {
    var user;
    (function (user) {
        'use strict';
        var LoginController = (function () {
            function LoginController($http, userService, authService, $state) {
                var _this = this;
                this.$http = $http;
                this.userService = userService;
                this.authService = authService;
                this.$state = $state;
                this.google = function () {
                    _this.authService.googleAuth();
                };
            }
            /////	Methods			/////
            LoginController.prototype.submit = function () {
                var _this = this;
                this.userService.login(this.email, this.password)
                    .then(function () { return _this.$state.go('home'); });
            };
            LoginController.$inject = ['$http', 'userService',
                'authService', '$state'];
            return LoginController;
        })();
        user.LoginController = LoginController;
        angular
            .module('app.user')
            .controller('LoginController', LoginController);
    })(user = app.user || (app.user = {}));
})(app || (app = {}));
//# sourceMappingURL=login.controller.js.map