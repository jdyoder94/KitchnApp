var mongoose = require('mongoose'),
    crypto = require('crypto'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

var salt = bcrypt.genSaltSync(10);

var UserSchema = new Schema({
    name: String,
    email: String,
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: String,
    provider: String,
    providerId: String,
    recipes: [{ type: Schema.ObjectId, ref: 'Recipe'}],
    shoppingList: {type: Schema.ObjectId, ref: 'ShoppingList'},
    pantryList: {type: Schema.ObjectId, ref: 'PantryList'}
});

UserSchema.pre('save',
    function(next){
        if(this.password){
            var hash = bcrypt.hashSync(this.password, salt);
            this.password = hash;
        }
    next();
    }
    
);

UserSchema.methods.authenticate = function(password) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne(
		{username: possibleUsername},
		function(err, user) {
			if (!err) {
				if (!user) {
					callback(possibleUsername);
				}
				else {
					return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
				}
			}
			else {
				callback(null);
			}
		}
	);
};

mongoose.model('User', UserSchema);