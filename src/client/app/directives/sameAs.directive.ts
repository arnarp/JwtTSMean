namespace app.directives {
    'use strict';

    class SameAs implements ng.IDirective {
        static $inject: Array<string> = [];
        constructor() {
        }

        static instance(): ng.IDirective {
            return new SameAs();
        }
        require: string = 'ngModel';
        link: ng.IDirectiveLinkFn = this.linkFn;

        private linkFn(
            scope: ng.IScope,
            instanceElement: ng.IAugmentedJQuery,
            instanceAttributes: ng.IAttributes,
            controller: ng.INgModelController,
            transclude: ng.ITranscludeFunction
            ) {
            function validateEquals(value: any) {
                var valid = (value === scope.$eval(instanceAttributes['sameAs']));
                controller.$setValidity('equal', valid);
                return valid ? value : undefined;
            }

            controller.$parsers.push(validateEquals);
            controller.$formatters.push(validateEquals);

            scope.$watch(instanceAttributes['sameAs'], function() {
                controller.$setViewValue(controller.$viewValue);
            });
        }
    }

    angular
        .module('app.directives')
        .directive('sameAs', SameAs.instance);
}