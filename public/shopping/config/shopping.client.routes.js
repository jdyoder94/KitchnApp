angular.module('shopping').config(['$routeProvider',
   function($routeProvider) {
       $routeProvider.
       when('/shoppingList', {
          templateUrl: '/shopping/views/shopping.client.view.html' 
       });
   } 
]);