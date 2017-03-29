angular.module('recipes').config(['$routeProvider',
   function($routeProvider) {
       $routeProvider.
       when('/recipes', {
           templateUrl: '/recipes/views/list-recipes.client.view.html' 
       }).
       when('/recipes/create', {
           templateUrl: '/recipes/views/create-recipe.client.view.html' 
       }).
       when('/recipes/:recipeId', {
           templateUrl: '/recipes/views/view-recipe.client.view.html' 
       }).
       when('/recipes/:recipeId/edit', {
          templateUrl: '/recipes/views/edit-recipe.client.view.html' 
       });
   }                              
]);