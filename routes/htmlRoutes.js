let db = require("../models");
let jwt = require("jsonwebtoken");


module.exports = function(app) {
  // Load index page
  app.get("/", function(request, response) {
    if (request.cookies.token) {
      let user = jwt.verify(request.cookie.token, 'your_jwt_secret');
			console.log('TCL: user', user)
      if (user) {
        db.Example.findAll({}).then(function(dbExamples) {
          return response.render("index", {
            msg: "Welcome!",
            loggedInUser: user,
            examples: dbExamples
          });
        });
      } else {
        return response.render("index", {
          msg: "Welcome!"
        });
      }
    } else {
      return response.render("user", {
        msg: "Welcome!"
      });
    }
    db.Example.findAll({}).then(function(dbExamples) {
      response.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/index", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("index", {
        example: dbExample
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
