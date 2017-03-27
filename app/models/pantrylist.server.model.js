var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PantryListSchema = new Schema({
   items: [ {type: String, trim: true, null: false} ]
});

mongoose.model('PantryList', PantryListSchema, 'pantrylists');