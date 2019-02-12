// require("dotenv").config();
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var exphbs = require("express-handlebars");
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require("./models");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// var passport = require('passport');
// var LocalStrategy = require('passport-local');
// var JWTStrategy = require('passport-jwt').Strategy;
// let ExtractJWT = require('passport-jwt').ExtractJwt;


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// passport.use(new LocalStrategy(
//   {
//     usernameField: 'username',
//     passwordField: 'password'
//   },
//   function(username, password, cd) {
//     db.User.findOne({ where:{ username: username }}).then(
//       function(user) {
//         console.log(user);
//         if (!user || !user.validatePassword(password)) {
//           return cd(null, false, {message: 'Incorrect email or password.'});
//         };
//           return cd(null, user, {message: 'Logged in Successfully.'});
//       }
//     ).catch(error => {
//       cd(error)
//       throw error;
//     });
//   }
// ));

// passport.use(
//   new JWTStrategy({
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     secretOrKey : 'your_jwt_secret'},
//     function(jwtPayload, done) {
//       //find current users information
//       try {
//         return done(null, jwtPayload)
//       } catch (error) {
//         console.log(error);
//         done(error);
//       }
//     }
//   )
// );

// Static directory
app.use(express.static("public"));

// Do we need???
// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
// let secureRoute = require("./routes/apiRoutes");
// app.use('/api/examples', passport.authenticate('jwt', {session: false}), secureRoute);
// require("./routes/htmlRoutes")(app);
// require("./routes/authRoutes")(app);

// Their new routes
require("./routes/html-routes.js")(app);
require("./routes/author-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/weekly-post-routes.js")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
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