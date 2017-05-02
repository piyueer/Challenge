(function() {
  'use strict';

  angular
    .module('page')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('table',{
        url:'/table',
        templateUrl:'app/table/table.html',
        controller:'TableController',
        controllerAs:'main'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
