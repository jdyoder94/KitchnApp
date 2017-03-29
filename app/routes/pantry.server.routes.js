var users = require('../../app/controllers/users.server.controller'),
    pantry = require('../../app/controllers/pantry.server.controller');

module.exports = function(app) {
  app.route('/api/pantryList')
    .get(users.requiresLogin, pantry.listItems)
    .post(users.requiresLogin, pantry.addItem)
    .delete(users.requiresLogin, pantry.deleteItems);
};