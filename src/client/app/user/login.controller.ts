namespace app.user {
	'use strict';

	interface ILoginController {
		email: string;
		password: string;
		submit: () => void;
<<<<<<< HEAD
		google: () => void;
=======
>>>>>>> passport-auth
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
<<<<<<< HEAD

		google = () => {
			this.authService.googleAuth();
		}
=======
>>>>>>> passport-auth
	}

	angular
		.module('app.user')
		.controller('LoginController', LoginController);
}