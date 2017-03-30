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
    res.json(req.recipe);
};

exports.recipeByID = function(req, res, next, id){
  Recipe.findById(id).exec(function(err, recipe){
      if(err)
         return next(err);
      if(!recipe)
          return next(new Error('Failed to load recipe ' + id));
      
      req.recipe = recipe;
      next();
  });  
};

exports.update = function(req, res){
    var recipe = new Recipe({
        _id: req.body._id,
        name: req.body.name,
        servings: req.body.servings,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps
    });
    var id = req.body._id;
    console.log(recipe);
    /*recipe.save(function(err){
        if(err){
            console.log(getErrorMessage(err));
            return res.status(400).send({
               message: getErrorMessage(err) 
            });
        }else{
            res.json(recipe);
        }
    });*/
    Recipe.findOneAndUpdate({_id: id}, recipe, function(err, Recipe){
       if(err){
           return res.send(500, {error: err});
       } 
        return res.json(Recipe);
    });
};

exports.delete = function(req, res) {
    var delReq = req.body;
    var uid = delReq.uid;
    var rid = delReq._id;
    console.log(delReq);
    User.update({_id: uid}, {$pull: {recipes: rid}}, function(err, User){
        console.log(User);
        console.log(err);
    });
    
    Recipe.findByIdAndRemove({_id: rid}, function(err, recipe){
        console.log(err);
    });
};