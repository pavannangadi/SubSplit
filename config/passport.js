// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/User');

// passport.use(
//   new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//     try {
//       const user = await User.findOne({ email });
      
//       if (!user) {
//         return done(null, false, { message: 'Email not registered' });
//       }
      
//       const isMatch = await user.matchPassword(password);
//       if (!isMatch) {
//         return done(null, false, { message: 'Incorrect password' });
//       }
      
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Local Strategy configuration
passport.use(
  new LocalStrategy(
    { usernameField: 'email' }, // Using email as the username field
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        
        if (!user) {
          return done(null, false, { message: 'Email not registered' });
        }

        // Add this method to your User model (see step 3)
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize/Deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});