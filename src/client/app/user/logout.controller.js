var app;
(function (app) {
    var user;
    (function (user) {
        'use strict';
        var LogoutController = (function () {
            function LogoutController(authService, $state) {
                this.authService = authService;
                this.$state = $state;
                authService.removeToken();
                $state.go('home');
            }
            LogoutController.$inject = ['authService', '$state'];
            return LogoutController;
        })();
        user.LogoutController = LogoutController;
        angular
            .module('app.user')
            .controller('LogoutController', LogoutController);
    })(user = app.user || (app.user = {}));
})(app || (app = {}));
//# sourceMappingURL=logout.controller.js.map