namespace app.dashboard {
	'use strict';

	export class PersonController {
		static $inject: Array<string> = ['$stateParams', 'dataservice'];
		constructor(private $stateParams: ng.ui.IStateParamsService,
			private dataservice: app.core.IDataService) {
			this.id = $stateParams['id'];
			dataservice.getPerson(this.id)
				.then((person) => this.person = person);
		}
		id: number;
		person: any;

	}

	angular
		.module('app.dashboard')
		.controller('PersonController', PersonController);
}