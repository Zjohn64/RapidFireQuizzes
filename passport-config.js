const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/User');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'identifier', passwordField: 'password' }, async (identifier, password, done) => {
      console.log('Inside LocalStrategy');
      try {
        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
        console.log('User:', user);
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password validation:', isPasswordValid);
        if (!isPasswordValid) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        return done(null, user);
      } catch (err) {
        console.log('Error in LocalStrategy:', err);
        return done(err);
      }
    })
  );

//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: '/auth/google/callback',
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         // Implement your Google authentication logic here
//       }
//     )
//   );

//   passport.use(
//     new FacebookStrategy(
//       {
//         clientID: process.env.FACEBOOK_APP_ID,
//         clientSecret: process.env.FACEBOOK_APP_SECRET,
//         callbackURL: '/auth/facebook/callback',
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         // Implement your Facebook authentication logic here
//       }
//     )
//   );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};