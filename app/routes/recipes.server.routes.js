var users = require('../../app/controllers/users.server.controller'),
    recipes = require('../../app/controllers/recipes.server.controller');

module.exports = function(app){
  app.route('/api/recipes')
    .post(users.requiresLogin, recipes.create);
};