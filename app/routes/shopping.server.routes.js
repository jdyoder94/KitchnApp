var users = require('../../app/controllers/users.server.controller'),
    shopping = require('../../app/controllers/shopping.server.controller');

module.exports = function(app) {
    app.route('/api/shoppingList')
        .get(users.requiresLogin, shopping.listItems)
        .post(users.requiresLogin, shopping.addItem)
        .delete(users.requiresLogin, shopping.delItems);
};