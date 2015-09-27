var app;
(function (app) {
    var user;
    (function (user) {
        'use strict';
        var RegisterController = (function () {
            function RegisterController($http, userService, authService, $state) {
                this.$http = $http;
                this.userService = userService;
                this.authService = authService;
                this.$state = $state;
            }
            /////	Methods			/////
            RegisterController.prototype.submit = function () {
                var _this = this;
                this.userService.register(this.email, this.password)
                    .then(function (resp) { return _this.$state.go('home'); });
            };
            RegisterController.$inject = ['$http', 'userService',
                'authService', '$state'];
            return RegisterController;
        })();
        user.RegisterController = RegisterController;
        angular
            .module('app.user')
            .controller('RegisterController', RegisterController);
    })(user = app.user || (app.user = {}));
})(app || (app = {}));
//# sourceMappingURL=register.controller.js.map