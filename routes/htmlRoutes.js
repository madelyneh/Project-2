// THIS ALL NEEDS TO BE UPDATED

let db = require("../models");
let jwt = require("jsonwebtoken");


module.exports = function(app) {
  // Load index page
  app.get("/", function(request, response) {
    if (request.cookies.token) {
      let author = jwt.verify(request.cookie.token, 'your_jwt_secret');
			console.log('TCL: author', author)
      if (author) {
        db.Example.findAll({}).then(function(dbExamples) {
          return response.render("index", {
            msg: "Welcome!",
            loggedInAuthor: author,
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


// Load daily page and pass in an example by id
app.get("/daily/:id", function(req, res) {
  db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    res.render("daily", {
      example: dbExample
    });
  });
});

app.get("/daily", function(req, res) {
  db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    res.render("daily", {
      example: dbExample
    });
  });
});


// Load weekly page and pass in an example by id
app.get("/weekly/:id", function(req, res) {
  db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    res.render("weekly", {
      example: dbExample
    });
  });
});

app.get("/weekly", function(req, res) {
  db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    res.render("weekly", {
      example: dbExample
    });
  });
});


// Load monthly page and pass in an example by id
app.get("/monthly/:id", function(req, res) {
  db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    res.render("monthly", {
      example: dbExample
    });
  });
});

app.get("/monthly", function(req, res) {
  db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    res.render("monthly", {
      example: dbExample
    });
  });
});


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
