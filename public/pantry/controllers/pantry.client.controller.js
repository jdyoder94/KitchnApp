angular.module('pantry').controller('PantryCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', 'Authentication', 'Pantry', function($scope, $route, $routeParams, $location, $http, Authentication, Pantry) {
    $scope.authentication = Authentication;
    
    $scope.selectedItems={};
    $scope.itemsToDelete=[];
    
    $scope.find = function(){
        $scope.ingredients = Pantry.get({pantryId: $scope.authentication.user.pantryList});
    
    };
    
    $scope.addIngredient = function(){
        var ingredient = new Pantry({
            pantryId: $scope.authentication.user.pantryList,
            ingName: this.ingName
        });
        
        console.log(ingredient);
        ingredient.$save();
        
        $route.reload();
    };
    
    $scope.deleteIngredients = function(){
        angular.forEach($scope.selectedItems, function(checked, item){
           if(checked){
               this.push(item);
           } 
        }, $scope.itemsToDelete);
        
        $http({
            url:'api/pantryList',
            method: 'DELETE',
            data: {
                pantryId: $scope.authentication.user.pantryList,
                ingNames: $scope.itemsToDelete
            },
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        }).then(function(res){
           console.log(res.data); 
        }, function(error){
            console.log(error);
        });
        
        $route.reload();
    };
}]);