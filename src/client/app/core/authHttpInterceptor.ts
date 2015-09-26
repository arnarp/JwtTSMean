namespace app.core {
	'use strict';

	export interface IHttpInterceptor {
		request?(config: ng.IRequestConfig):
			ng.IRequestConfig | ng.IPromise<ng.IRequestConfig>;
		requestError?(rejection: any): any;
		response?<T>(response: ng.IHttpPromiseCallbackArg<T>):
			T | ng.IPromise<T>;
		responseError?(rejection: any) : any;
	}

	export class AuthHttpInterceptor implements IHttpInterceptor {
		static $inject: Array<string> = ['authService'];
		constructor(private authService: IAuthService) {
		}

		request = (config : ng.IRequestConfig) => {
			var token = this.authService.getToken();
			if (token !== null) {
				config.headers['Authorization'] = `Bearer ${token}`;
			}
			return config;
		}

		response = <T>(response: ng.IHttpPromiseCallbackArg<T>) => {

			return response;
		}

	}

	angular
		.module('app.core')
		.service('authHttpInterceptor', AuthHttpInterceptor);
}