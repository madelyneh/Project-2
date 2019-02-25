require("dotenv").config();
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");

var db = require("./models");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

var passport = require('passport');
var LocalStrategy = require('passport-local');
var JWTStrategy = require('passport-jwt').Strategy;
let ExtractJWT = require('passport-jwt').ExtractJwt;

// Passport strategies
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log("Server 52: Username:" + username + " Password: " + password);
    // TODO Make this into a reusable function that can then get called in the jwt call in the 'try' section to pull up the user.
    db.Author.findOne({ where:{ username: username }})
      .then(function(user) {
          console.log("[server.js] Passport Local Strategy");
          console.log("Server 56: " + JSON.stringify(user));
          if (!user) {
            // If there is no user a user needs to be made here
            console.log("Server.js- 64. User: " + user);
            return done(null, user, {message: 'Making a user.'});


          } else if (!user.validatePassword(password)) {
            return done(null, false, {message: 'Incorrect email or password.'});
          }
          console.log('[server.js] Logged in');
          return done(null, user, {message: 'Logged in Successfully.'});
        }
      )
      .catch(error => {
        done(error);
      });
  }
));

passport.use(
  new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
  },
  function(jwtPayload, done) {
    console.log('Parsing the tokon');
    try {
      return done(null, jwtPayload);
    } catch (error) {
      return done(error);
    }
  }
));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// This checks if the user is logged in or not. If they arent it will redirect to the login page
// app.use(function (req, res, next) {
//   console.log('[server.js] Checking JWT');
//   passport.authenticate('JWT', { session: false }, (err, user) => {
//     console.log('[server.js] JWT Callback');
//     if (req.user || req.url === '/api/auth' || req.url === '/api/authors') {
//       console.log('on to the next one');
//       // return res.redirect("/daily");
//       return next();
//     }
//     console.log("YOU SHALL NOT PASSSSSS");
//     return res.redirect("/");
//   });
// });



// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// Routes
var dailyRoutes = require('./routes/secure-routes');
app.use('daily', passport.authenticate('jwt', {session: false}), dailyRoutes);
require("./routes/html-routes.js")(app);
require("./routes/author-api-routes")(app);
require("./routes/weekly-post-routes")(app);
require("./routes/auth-api-routes")(app);


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "production") {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
// https://github.com/sequelize/sequelize/issues/2670
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
    );
  });
});

module.exports = app;