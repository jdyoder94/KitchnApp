angular.module('pantry').config(['$routeProvider',
   function($routeProvider) {
       $routeProvider.
       when('/pantryList', {
          templateUrl: '/pantry/views/pantry.client.view.html' 
       });
   } 
]);