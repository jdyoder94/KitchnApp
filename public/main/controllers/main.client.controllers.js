angular.module('main').controller('MainCtrl', ['$scope', 'Authentication', 
   function($scope, Authentication){
       $scope.authentication = Authentication;
   }                                             
]);