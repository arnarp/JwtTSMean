var app;
(function (app) {
    var layout;
    (function (layout) {
        'use strict';
        var ShellController = (function () {
            function ShellController($rootScope, $timeout, logger, authService) {
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.logger = logger;
                this.authService = authService;
                this.busyMessage = 'Please wait ...';
                this.isBusy = true;
                this.isAuthenticated = this.authService.isAuthenticated;
                $rootScope.showSplash = true;
                logger.success('App loaded', null);
                this.hideSplash();
            }
            ShellController.prototype.hideSplash = function () {
                var _this = this;
                //Force a 1 second delay so we can see the splash.
                this.$timeout(function () {
                    _this.$rootScope.showSplash = false;
                }, 1000);
            };
            ShellController.$inject = ['$rootScope',
                '$timeout', 'logger', 'authService'];
            return ShellController;
        })();
        layout.ShellController = ShellController;
        angular
            .module('app.layout')
            .controller('ShellController', ShellController);
    })(layout = app.layout || (app.layout = {}));
})(app || (app = {}));
//# sourceMappingURL=shell.controller.js.map