var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        'use strict';
        var PersonController = (function () {
            function PersonController($stateParams, dataservice) {
                var _this = this;
                this.$stateParams = $stateParams;
                this.dataservice = dataservice;
                this.id = $stateParams['id'];
                dataservice.getPerson(this.id)
                    .then(function (person) { return _this.person = person; });
            }
            PersonController.$inject = ['$stateParams', 'dataservice'];
            return PersonController;
        })();
        dashboard.PersonController = PersonController;
        angular
            .module('app.dashboard')
            .controller('PersonController', PersonController);
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=person.controller.js.map