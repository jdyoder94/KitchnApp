var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShoppingListSchema = new Schema({
   items: [ {type: String, trim: true, null: false} ]
});

mongoose.model('ShoppingList', ShoppingListSchema, 'shoppinglists');