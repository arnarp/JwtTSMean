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
			'authService', '$state'];
		constructor(private $http: ng.IHttpService,
			private userService: app.user.IUserService,
			private authService: app.core.IAuthService,
			private $state: ng.ui.IStateService) {
		}

		/////	Properties		/////
		email: string;
		password: string;
		password_confirm: string;
		/////	Methods			/////
		submit() {
			this.userService.register(this.email, this.password)
				.then((resp) => this.$state.go('home'));
		}
	}

	angular
		.module('app.user')
		.controller('RegisterController', RegisterController);
}