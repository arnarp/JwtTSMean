module app {
	'use strict';
	export interface IAppRootScope extends ng.IRootScopeService {
		$state: ng.ui.IStateService;
		$stateParams: ng.ui.IStateParamsService;
		showSplash: boolean;
	}
}