var mongoose = require('mongoose'),
    Pantry = mongoose.model('PantryList');

exports.listItems = function(req, res, next){
    //console.log(req.query.pantryId);
    Pantry.findById(req.query.pantryId).exec(function(err, pantry){
        if(err)
            return next(err);
        
        if(!pantry)
            return next(new Error('Failed to load pantry list'));
        
        res.json(pantry);
        next();
    });
};

exports.addItem = function(req, res, next){
    var newIng = req.body;
    var ingredient = newIng.ingName;
    var pantryId = newIng.pantryId;
    console.log(pantryId + "\n" + ingredient);
    Pantry.findOneAndUpdate({_id: pantryId}, {$push: {items: ingredient}}, function(err, PantryList){
        console.log(err);
    });
    
    res.json(newIng);
};

exports.deleteItems = function(req, res, next) {
    var delRequest = req.body;
    console.log(delRequest.ingNames);
    var ingredientsToDelete = delRequest.ingNames;
    console.log(ingredientsToDelete);
    var pantryId = delRequest.pantryId;
    console.log(pantryId);
    Pantry.findOneAndUpdate({_id: pantryId}, {$pullAll: {items: ingredientsToDelete}}, function(err, PantryList){
       console.log(err); 
    });
    
    res.json(delRequest);
};