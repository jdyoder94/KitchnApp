var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipe'),
    User = mongoose.model('User');

var getErrorMessage = function(err) {
    if(err.errors) {
        for(var errName in err.errors) {
            if(err.errors[errName].mesage) return err.errors[errName].message;
        }
    } else { 
        return 'Unknown server error';
    }
};

exports.create = function(req, res){
    var recipeReq = req.body;
    var userId = recipeReq.uid;
    var recName = recipeReq.name;
    var recServe = recipeReq.servings;
    var recDesc = recipeReq.description;
    var recIngs = recipeReq.ingredients;
    var recSteps = recipeReq.steps;
    var recipe = new Recipe({
        name: recName,
        servings: recServe,
        description: recDesc,
        ingredients: recIngs,
        steps: recSteps
    });
    
    recipe.save(function(err){
        if(err){
            return res.status(400).send({
               message: getErrorMessage(err) 
            });
        }else {
            User.findOneAndUpdate({_id: userId}, {$push: {recipes: recipe._id}}, function(err, User){
                console.log(err);
            });
            res.json(recipe);
        }
    });
    
    
};

exports.list = function(req, res){
    var recipes = req.query.recipes;
    console.log(recipes);
    Recipe.find({'_id': {$in: recipes}
    }, function(err, recipes){
        res.json(recipes);
    });
};

exports.read = function(req, res){
    
};

exports.update = function(req, res){
    
};

exports.delete = function(req, res) {
    
};