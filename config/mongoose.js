var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    
    require('../app/models/user.server.model');
    require('../app/models/pantrylist.server.model');
    require('../app/models/shoppinglist.server.model');
    require('../app/models/recipes.server.model');
    
    return db;
};