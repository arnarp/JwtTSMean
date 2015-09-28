namespace app.user {
	'use strict';

	export interface IUserService {
		register(email: string, password: string)
			: ng.IPromise<UserLoginResp>;
		login(email: string, password: string)
			: ng.IPromise<UserLoginResp>;
		googleLogin: () => void;
	}
	export interface User {
		email: string;
		password?: string;
	}
	export interface ApiResponse {
		msg: string;
	}
	export interface UserLoginResp extends ApiResponse {
		user: User;
		token: string;
	}

	export class UserService implements IUserService {
		static $inject: Array<string> = [
			'$http', '$q', 'exception', 'logger', 'authService', '$window'
		];
		constructor(
			private $http: ng.IHttpService,
			private $q: ng.IQService,
			private exception: blocks.exception.IException,
            private logger: blocks.logger.Logger,
			private authService: app.core.IAuthService,
			private $window: ng.IWindowService) {
		}

		register = (email: string, password: string) =>
			this.$http
				.post<UserLoginResp>('/api/register', { email: email, password: password })
				.then(this.extractData)
				.then(this.setToken)
				.then(this.alertRegisteredSuccess)
				.catch(this.onRegisterRejected);

		login = (email: string, password: string) =>
			this.$http
				.post<UserLoginResp>('/api/login', { email: email, password: password })
				.then(this.extractData)
				.then(this.setToken)
				.then(this.alertLoginSuccess)
				.catch(this.onLoginRejected);

		googleLogin = () => {
			var clientId = '88579833395-a5p8a46ompaopj9ptvluf3v2pila71e5.apps.googleusercontent.com';
			var endPoint = 'https://accounts.google.com/o/oauth2/auth';
			var params = [
				'response_type=code',
				`client_id=${clientId}`,
				`redirect_uri=${this.$window.location.origin}`,
				'scope=profile email'
			];
			var url = `${endPoint}?${params.join('&') }`;
			var size = 500;
			var width = `width=${size}`;
			var height = `height=${size}`;
			var left = `left=${(this.$window.outerWidth - size) / 2}`;
			var top = `top=${(this.$window.outerHeight - size) / 2.5}`;
			var options = `${width},${height},${left},${top}`;
			var popup: ng.IWindowService = this.$window.open(url, '', options);
			this.$window.focus();
			this.$window.addEventListener('message', (event) => {
				if (event.origin === this.$window.location.origin) {
					console.log(event.data);
					popup.close();
					var code = event.data;
					this.$http.post('api/auth/google', {
						code: code,
						clientId: clientId,
						redirectUri: this.$window.location.origin
					 });
				}
			});
		}

        private extractData =
		(response: ng.IHttpPromiseCallbackArg<UserLoginResp>) => response.data;

		private alertRegisteredSuccess =
		(resp: UserLoginResp) => {
			this.logger.success(
				`You, ${resp.user.email}, are now registered`, resp, 'Success');
			return resp;
		}

		private alertLoginSuccess =
		(resp: UserLoginResp) => {
			this.logger.success(`${resp.user.email} have been logged in`, resp, 'Success');
			return resp;
		}

		private setToken = (resp: UserLoginResp) => {
			this.authService.setToken(resp.token);
			return resp;
		}

		private onRegisterRejected: (resp: any) => {} = (resp) => {
			var msg = resp.data.description;
            var reason = 'post register user failed.';
            this.exception.catcher(msg)(reason);
            return this.$q.reject(msg);
		}

		private onLoginRejected: (resp: any) => {} = (resp) => {
			var msg = resp.data.description;
            var reason = 'login failed.';
            this.exception.catcher(msg)(reason);
            return this.$q.reject(msg);
		}
	}

	angular
		.module('app.user')
		.service('userService', UserService);
}