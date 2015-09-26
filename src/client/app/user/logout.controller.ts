namespace app.user {
	'use strict';

	export class LogoutController {
		static $inject: Array<string> = ['authService', '$state'];
		constructor(private authService: app.core.IAuthService,
			private $state: ng.ui.IStateService) {
			authService.removeToken();
			$state.go('home');
		}

	}

	angular
		.module('app.user')
		.controller('LogoutController', LogoutController);
}