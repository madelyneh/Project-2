require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var models = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

var passport = require('passport');
var LocalStrategy = require('passport-local');
// var JWTStrategy = require('passport-jwt');


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

passport.use(new localStorage(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, cd) {
    models.User.findOne({ username: username }).then(
      function(user) {
        console.log(user);
        if (!user || !user.validatePassword(password)) {
          return cd(null, false, {message: 'Incorrect email or password.'});
        }else if (user.validatePassword(password)) {
          return createImageBitmap(null, user, {message: 'Logged in Sucessfully.'});
        } else {
          return cb(null, false, {message: 'Incorrect Password. Please try again.'})
        }
      }
    ).catch(error => {
      cd(error)
      throw error;
    });
  }
));


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/authRoutes")(app);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  models.User.findById(id, function(err, user) {
    cb(err, user);
  });
});


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
