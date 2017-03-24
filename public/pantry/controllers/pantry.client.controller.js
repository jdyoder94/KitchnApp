angular.module('pantry').controller('PantryCtrl', ['$scope', '$routeParams', '$location', 'Authentication', 'Pantry', function($scope, $routeParams, $location, Authentication, Pantry) {
    $scope.authentication = Authentication;
    
    $scope.find = function(){
        $scope.ingredients = Pantry.get({pantryId: $scope.authentication.user.pantryList});
    };
}]);