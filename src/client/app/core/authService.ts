namespace app.core {
	'use strict';

	export interface IAuthService {
		setToken(token: string): void;
		getToken(): string;
		isAuthenticated(): boolean;
		removeToken(): void;
	}
	export class TokenAuthService implements IAuthService {
		static $inject: Array<string> = ['$window'];
		cachedToken: string;
		storage: Storage;
		tokenKey = 'userToken';

		constructor(private $window: ng.IWindowService) {
			this.storage = $window.localStorage;
		}

		setToken(token: string) {
			this.cachedToken = token;
			this.storage.setItem(this.tokenKey, token);
		}

		getToken: () => string = () => {
			if (this.cachedToken === undefined) {
				this.cachedToken = this.storage.getItem(this.tokenKey);
			}
			return this.cachedToken;
		}

		isAuthenticated: () => boolean = () => {
			return this.getToken() !== null;
		}

		removeToken() {
			this.cachedToken = null;
			this.storage.removeItem(this.tokenKey);
		}
	}

	angular
		.module('app.core')
		.service('authService', TokenAuthService);
}