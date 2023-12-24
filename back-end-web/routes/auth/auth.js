const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const crypto = require('crypto');
require('dotenv').config()

const GOOGLE_CLIENT_ID = "73295202240-g4r4fqevidd18jjvoinih26ng5f5cd59.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const callback_url = process.env.BACKEND_HOST + "/auth/google/callback";
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: callback_url,
  passReqToCallback: true,
},


function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  done(null, { id: id });
});
