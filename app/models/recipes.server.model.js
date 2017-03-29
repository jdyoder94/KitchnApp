var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    name: {type: String, trim: true},
    servings: Number,
    description: {type: String, trim: true},
    ingredients: [{
        ingQty: {type: String},
        ingMeasurement: {type: String},
        ingName: {type: String, null: false}
    }],
    steps: [{
        stepNum: {type: Number},
        stepText: {type: String, null: false}
    }]
});

mongoose.model('Recipe', RecipeSchema, 'recipes');