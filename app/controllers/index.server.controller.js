exports.render = function(req, res) {
  res.render('index', {
    title: 'Kitchn App',
    user: JSON.stringify(req.user)
  });
};