var secrets = require('../../secrets.json');

module.exports = {
  "DATABASE_URI": secrets.databaseURI,
  "SESSION_SECRET": secrets.session,
  "TWITTER": {
    "consumerKey": "dH1cEGorTHqLvxSeaHp2uWig0",
    "consumerSecret": secrets.twitterSecret,
    "callbackUrl": "http://127.0.0.1:8080/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "591275987704682",
    "clientSecret": secrets.facebookSecret,
    "callbackURL": "http://localhost:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "904557065956-n0beojtbnuvk707l1nku6gm82vuib4n1.apps.googleusercontent.com",
    "clientSecret": secrets.googleSecret,
    "callbackURL": "http://127.0.0.1:8080/auth/google/callback"
  }
};