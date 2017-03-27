angular.module('pantry').controller('PantryCtrl', ['$scope', '$route', '$routeParams', '$location', 'Authentication', 'Pantry', function($scope, $route, $routeParams, $location, Authentication, Pantry) {
    $scope.authentication = Authentication;
    
    $scope.find = function(){
        $scope.ingredients = Pantry.get({pantryId: $scope.authentication.user.pantryList});
        
        console.log($scope.ingredients);
    };
    
    $scope.addIngredient = function(){
        var ingredient = new Pantry({
            pantryId: $scope.authentication.user.pantryList,
            ingName: this.ingName
        });
        ingredient.$save();
        
        $route.reload();
    }
}]);