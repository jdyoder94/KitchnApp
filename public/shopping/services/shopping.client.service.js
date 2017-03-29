angular.module('shopping').factory('Shopping',['$resource',
    function($resource){
        return $resource('api/shoppingList', {},{
           delete: {
               method: 'DELETE',
               isArray:  true
           } 
        });
    }
]);