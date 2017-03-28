angular.module('pantry').factory('Pantry',['$resource',
   function($resource){
       return $resource('api/pantryList', {}, {
        delete: {
            method: 'DELETE',
            isArray: true
        }
       });
   }                                       
]);