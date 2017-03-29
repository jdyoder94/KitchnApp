var mongoose = require('mongoose'),
    Shopping = mongoose.model('ShoppingList');

exports.listItems = function(req, res, next){
    Shopping.findById(req.query.shoppingId).exec(function(err, shopping){
       if(err){
           return next(err);
       }
        
        if(!shopping){
            return next(new Error('Failed to load shopping list'));
        }
        
        res.json(shopping);
        next();
    });
};

exports.addItem = function(req, res, next){
    var addReq = req.body;
    var shoppingId = addReq.shoppingId;
    var ingredient = addReq.ingName;
    
    console.log(addReq);
    
    Shopping.findOneAndUpdate({_id: shoppingId}, {$push: {items: ingredient}}, function(err, ShoppingList){
       console.log(err); 
    });
    
    res.json(addReq);
};

exports.delItems = function(req, res, next){
    var delReq = req.body;
    var shoppingId = delReq.shoppingId;
    var ingredients = delReq.ingNames;
    
    Shopping.findOneAndUpdate({_id: shoppingId}, {$pullAll: {items: ingredients}}, function(err, ShoppingList){
        console.log(err);
    });

    res.json(delReq);
};