angular.module('recipes').controller('RecipeCtrl', ['$scope', '$routeParams', '$location', 'Authentication', 'Recipes', function($scope, $routeParams, $location, Authentication, Recipes){
    $scope.authentication = Authentication;
    
    $scope.ingredients = [{id: 'ingredient1'}];
    $scope.ingredientList=[];
    
    $scope.steps = [{id: 'step1'}];
    $scope.stepList = [];
    
    $scope.addNewIng = function(){
        var newId = $scope.ingredients.length+1;
        $scope.ingredients.push({'id':'ingredient'+newId});
    };
    
    $scope.removeIng = function(){
        if($scope.ingredients.length > 1){
            var idToRemove = $scope.ingredients.length-1;
            $scope.ingredients.splice(idToRemove);
        }
    };
    
    $scope.addNewStep = function(){
        var newId = $scope.steps.length+1;
        $scope.steps.push({'id':'step'+newId});
    };
    
    $scope.removeStep = function(){
        if($scope.steps.length > 1){
            var idToRemove = $scope.steps.length-1;
            $scope.steps.splice(idToRemove);
        }
    };
    
    $scope.saveRecipe = function(){
        var ctr = 0;
        angular.forEach($scope.ingredients, function(ingredient){
            var currIngredient={};
            if(ingredient.qty)
                currIngredient.ingQty = ingredient.qty;
            if(ingredient.measurement)
                currIngredient.ingMeasurement = ingredient.measurement;
            if(ingredient.name)
                currIngredient.ingName = ingredient.name;
            
            if(currIngredient.ingName)
                this.push(currIngredient);
          }, $scope.ingredientList);
        angular.forEach($scope.steps, function(step){
            var currStep={};
            
            if(step.name){
                ctr = ctr + 1;
                currStep.stepNum = ctr;
                currStep.stepText = step.name;
            }
            
            if(currStep.stepText)
                this.push(currStep);
        }, $scope.stepList);
        
        var name = this.name;
        var servings = this.servings;
        var description = this.description;
        
        console.log($scope.authentication.user._id);
        
        var recipeToSave = new Recipes({
            uid: $scope.authentication.user._id,
            name: name,
            servings: servings,
            description: description,
            ingredients: $scope.ingredientList,
            steps: $scope.stepList
        });
        //console.log(recipeToSave);
        recipeToSave.$save();
    };
}                                                   
]);