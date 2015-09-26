namespace app.layout {
    'use strict';

    export class ShellController{
        static $inject: Array<string> = ['$rootScope',
            '$timeout', 'logger', 'authService'];
        constructor(
            private $rootScope: app.IAppRootScope,
            private $timeout: ng.ITimeoutService,
            private logger: blocks.logger.ILogger,
            private authService: app.core.IAuthService) {
            $rootScope.showSplash = true;
            logger.success('App loaded', null);
            this.hideSplash();
        }
        busyMessage = 'Please wait ...';
        isBusy = true;
        isAuthenticated = this.authService.isAuthenticated;

        hideSplash() {
            //Force a 1 second delay so we can see the splash.
            this.$timeout(() => {
                this.$rootScope.showSplash = false; }, 1000);
        }
    }
    angular
        .module('app.layout')
        .controller('ShellController', ShellController);
}