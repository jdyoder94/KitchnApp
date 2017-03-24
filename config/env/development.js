var port = 3000;

module.exports = {
  port: port,
  db: 'mongodb://localhost/KitchnApp',
  facebook: {
      clientID: '751939251648770',
      clientSecret: '186adce41ebb465463047915350e9c6c',
      callbackURL: 'http://localhost:' + port + '/oauth/facebook/callback'
  },
  twitter: {
      clientID: '1Jl85w8bhudsgKpfNeWCYX2Uh',
      clientSecret: 'VFqgZJ1EbwHhno9aEU0m759Agae9Qg0DY1EbQbo0jQU9yLwGon',
      callbackURL: 'http://localhost:' + port + '/oauth/twitter/callback'
  }
};