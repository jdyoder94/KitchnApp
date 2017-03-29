angular.module('recipes').controller('RecipeCtrl', ['$scope', '$routeParams', '$location', 'Authentication', 'Recipes', function($scope, $routeParams, $location, Authentication, Recipes){
    $scope.authentication = Authentication;
    
}                                                   
]);