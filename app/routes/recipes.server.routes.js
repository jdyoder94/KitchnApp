var users = require('../../app/controllers/users.server.controller'),
    recipes = require('../../app/controllers/recipes.server.controller');

module.exports = function(app){
    app.route('/api/recipes')
        .get(users.requiresLogin, recipes.list)
        .post(users.requiresLogin, recipes.create);
    
    app.route('/api/recipes/:recipeId')
        .get(recipes.read)
        .delete(users.requiresLogin, recipes.delete);
    
    app.param('recipeId', recipes.recipeByID);
};