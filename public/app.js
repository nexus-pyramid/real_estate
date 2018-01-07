var app = angular.module("app", ['ngRoute', 'gservice', 'geolocation']);
app.config( function ($routeProvider, $locationProvider, $httpProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/', {
    templateUrl: 'assets/partials/home.html',
    controller: 'messageController'
   })
  .when('/addProperty', {
    templateUrl: 'assets/partials/add_home.html',
    controller: 'homeController'
  })
   .when('/homes', {
    templateUrl: 'assets/partials/homes.html',
    controller:  'homeController'
  })
    .when('/about', {
    templateUrl: 'assets/partials/about.html',
    controller:  'homeController'
  })
    .when('/contact', {
    templateUrl: 'assets/partials/contact.html',
    controller:  'messageController'
  })
  // .otherwise({
  //   redirectTo: '/'
  // });
});
