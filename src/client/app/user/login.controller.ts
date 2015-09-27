namespace app.user {
	'use strict';

	interface ILoginController {
		email: string;
		password: string;
		submit: () => void;
		google: () => void;
	}

	export class LoginController implements ILoginController {
		static $inject: Array<string> = ['$http', 'userService',
			'authService', '$state'];
		constructor(private $http: ng.IHttpService,
			private userService: app.user.IUserService,
			private authService: app.core.IAuthService,
			private $state: ng.ui.IStateService) {
		}

		/////	Properties		/////
		email: string;
		password: string;
		/////	Methods			/////
		submit() {
			this.userService.login(this.email, this.password)
				.then(() => this.$state.go('home'));
		}

		google = () => {
			this.authService.googleAuth();
		}
	}

	angular
		.module('app.user')
		.controller('LoginController', LoginController);
}