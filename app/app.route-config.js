(function() {
    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .when("/", "/admin")
            .when("", "/admin")
            .otherwise("/admin");

    $stateProvider
      .state('admin', {
        url: '/admin',
        controller: 'MainController',
        templateUrl: 'html/mainContents.html'
      })
      .state('listTest', {
        url: '/listTest',
        controller: 'ListTestController',
        templateUrl: 'html/listTest.html'
      })
    }
})();