namespace app.user {
	'use strict';

	interface IRegisterController {
		email: string;
		password: string;
		password_confirm: string;
		submit: () => void;
	}

	export class RegisterController implements IRegisterController {
		static $inject: Array<string> = ['$http', 'userService',
			'authService'];
		constructor(private $http: ng.IHttpService,
			private userService: app.user.IUserService,
			private authService: app.core.IAuthService) {
		}

		/////	Properties		/////
		email: string;
		password: string;
		password_confirm: string;
		/////	Methods			/////
		submit() {
			this.userService.register(this.email, this.password)
				.then((resp) => this.authService.setToken(resp.token));
		}
	}

	angular
		.module('app.user')
		.controller('RegisterController', RegisterController);
}