namespace app.user {
	'use strict';

	export interface IUserService {
		register(email: string, password: string)
			: ng.IPromise<UserLoginResp>;
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
			'$http', '$q', 'exception', 'logger'
		];
		constructor(
			private $http: ng.IHttpService,
			private $q: ng.IQService,
			private exception: blocks.exception.IException,
            private logger: blocks.logger.Logger) {
		}

		register = (email: string, password: string) =>
			this.$http.post<UserLoginResp>(
				'/api/register', { email: email, password: password })
				.then<ng.IHttpPromiseCallbackArg<UserLoginResp>>(this.alertSuccess)
				.then<ng.IHttpPromiseCallbackArg<UserLoginResp>>(this.success)
				.catch(this.onRejected);

        private success:
		(response: ng.IHttpPromiseCallbackArg<UserLoginResp>) => UserLoginResp =
			(response) => response.data;

		private alertSuccess:
		(resp: ng.IHttpPromiseCallbackArg<UserLoginResp>) => 	ng.IHttpPromiseCallbackArg<UserLoginResp> =
		(resp) => {
			this.logger.success(
				`You, ${resp.data.user.email}, are now registered`, resp, 'Success');
			return resp;
		}

		private onRejected: (resp: any) => {} = (resp) => {
			var msg = resp.data.description;
            var reason = 'post register user failed.';
            this.exception.catcher(msg)(reason);
            return this.$q.reject(msg);
		}
	}

	angular
		.module('app.user')
		.service('userService', UserService);
}