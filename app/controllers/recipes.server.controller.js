var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipe');

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
    
};

exports.list = function(req, res){
    
};

exports.read = function(req, res){
    
};

exports.update = function(req, res){
    
};

exports.delete = function(req, res) {
    
};