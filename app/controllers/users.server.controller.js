var User = require('mongoose').model('User'),
    PantryList = require('mongoose').model('PantryList'),
    ShoppingList = require('mongoose').model('ShoppingList'),
    passport = require('passport');

var getErrorMessage = function(err) {
    var message = '';
    if(err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for(var errName in err.errors) {
            if(err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }
    return message;  
};

exports.renderLogin = function(req, res, next) {
  if(!req.user) {
      res.render('login', {
         title: 'Log-in Form',
         messages: req.flash('error') || req.flash('info')
      });
  }  else {
      return res.redirect('/');
  }
};

exports.renderRegister = function(req, res, next) {
  if(!req.user) {
      res.render('register', {
          title: 'Register Form',
          messages: req.flash('error')
      });
  }  else  {
      return res.redirect('/');
  }
};

exports.register = function(req, res, next) {
    if(!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        var pantry = new PantryList([]);
        var p_id = pantry._id;
        var shopping = new ShoppingList([]);
        var s_id = shopping._id;
        user.shoppingList = s_id;
        user.pantryList = p_id;
        
        pantry.save(function(err){
           if(err) {
               var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/register');
           }
        });
        
        shopping.save(function(err){
           if(err){
               var message = getErrorMessage(err);
               req.flash('error', message);
               return res.redirect('/register');
           } 
        });
        
        user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/register');
			}

			req.login(user, function(err) {
				if (err)
					return next(err);

				return res.redirect('/');
			});
		});
    }else {
        return res.redirect('/');
    }
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.saveOAuthUserProfile = function(req, profile, done) {
	User.findOne({
			provider: profile.provider,
			providerId: profile.providerId
		},
		function(err, user) {
			if (err) {
				return done(err);
			} else {
				if (!user) {
					var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
					User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
						profile.username = availableUsername;
						user = new User(profile);

						user.save(function(err) {
							if (err) {
								var message = _this.getErrorMessage(err);
								req.flash('error', message);
								return res.redirect('/register');
							}

							return done(err, user);
						});
					});
				} else {
					return done(err, user);
				}
			}
		}
	);
};

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};