namespace app {
    'use strict';

    angular
        .module('app')
        .run(addStateRefToRootScope)
        .config(configureCoreRoutes)

    function addStateRefToRootScope($rootScope: IAppRootScope,
        $state: ng.ui.IStateService, $stateParams: ng.ui.IStateParamsService) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    /* @ngInject */
    function configureCoreRoutes($locationProvider: ng.ILocationProvider,
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider) {

        // If true, will rely on history.pushState to change urls where
        // supported. Will fall back to hash- prefixed paths in browsers
        // that do not support pushState
        $locationProvider.html5Mode(true);

        /////////////////////////////
        // Redirects and Otherwise //
        /////////////////////////////

        // Use $urlRouterProvider to configure any redirects (when) and invalid
        // urls(otherwise).
        $urlRouterProvider

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
            .otherwise('404');

        //////////////////////////
        // State Configurations //
        //////////////////////////

        // Use $stateProvider to configure your states.
        $stateProvider

        //////////
        // Home //
        //////////
            .state('home', {
                url: '/',
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            })
            .state('person', {
                url: '/person/{id:int}',
                templateUrl: 'app/dashboard/person.html',
                controller: 'PersonController',
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/user/register',
                templateUrl: 'app/user/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/user/login',
                templateUrl: 'app/user/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('logout', {
                controller: 'LogoutController',
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminController',
                controllerAs: 'vm'
            })
            .state('404', {
                templateUrl: 'app/core/404.html'
            });
    }
}