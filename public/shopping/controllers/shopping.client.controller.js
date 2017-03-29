angular.module('shopping').controller('ShoppingCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', 'Authentication', 'Shopping', function($scope, $route, $routeParams, $location, $http, Authentication, Shopping){
    $scope.authentication = Authentication;
    
    $scope.selectedItems={};
    $scope.itemsToDelete=[];
    
    $scope.find = function(){
        $scope.ingredients = Shopping.get({shoppingId: $scope.authentication.user.shoppingList});
        console.log($scope.ingredients);
    };
    
    $scope.addIngredient = function(){
        var ingredient = new Shopping({
            shoppingId: $scope.authentication.user.shoppingList,
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
            url:'api/shoppingList',
            method: 'DELETE',
            data: {
                shoppingId: $scope.authentication.user.shoppingList,
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