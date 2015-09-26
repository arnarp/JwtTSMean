var app;
(function (app) {
    var directives;
    (function (directives) {
        'use strict';
        var SameAs = (function () {
            function SameAs() {
                this.require = 'ngModel';
                this.link = this.linkFn;
            }
            SameAs.instance = function () {
                return new SameAs();
            };
            SameAs.prototype.linkFn = function (scope, instanceElement, instanceAttributes, controller, transclude) {
                function validateEquals(value) {
                    var valid = (value === scope.$eval(instanceAttributes['sameAs']));
                    controller.$setValidity('equal', valid);
                    return valid ? value : undefined;
                }
                controller.$parsers.push(validateEquals);
                controller.$formatters.push(validateEquals);
                scope.$watch(instanceAttributes['sameAs'], function () {
                    controller.$setViewValue(controller.$viewValue);
                });
            };
            SameAs.$inject = [];
            return SameAs;
        })();
        angular
            .module('app.directives')
            .directive('sameAs', SameAs.instance);
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=sameAs.directive.js.map