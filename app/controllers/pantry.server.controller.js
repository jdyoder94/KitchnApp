var mongoose = require('mongoose'),
    Pantry = mongoose.model('PantryList');

exports.listItems = function(req, res, next){
    //console.log(req.query.pantryId);
    Pantry.findById(req.query.pantryId).exec(function(err, pantry){
        if(err)
            return next(err);
        
        if(!pantry)
            return next(new Error('Failed to load pantry list'));
        
        res.send(pantry);
        next();
    });
};