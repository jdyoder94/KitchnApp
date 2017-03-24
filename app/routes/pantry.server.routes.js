var users = require('../../app/controllers/users.server.controller'),
    pantry = require('../../app/controllers/pantry.server.controller');

module.exports = function(app) {
  app.route('/api/pantryList')
    .get(pantry.listItems);
    
  //app.route('/pantryList')
  //  .get(pantry.renderPantryList);
};