namespace app.core {
	'use strict';

	export interface IAuthService {
		setToken(token: string): void;
		getToken(): string;
		isAuthenticated(): boolean;
		removeToken(): void;
		googleAuth: () => void;
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

		googleAuth = () => {
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
			this.$window.open(url, '', options);
		}
	}

	angular
		.module('app.core')
		.service('authService', TokenAuthService);
}