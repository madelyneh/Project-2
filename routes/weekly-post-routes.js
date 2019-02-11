var db = require("../models");

module.exports = function(app) {
  app.get("/api/weekly", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Weekly.findAll({
      include: [db.Author]
    }).then(function(dbWeekly) {
      res.json(dbWeekly);
    });
  });

  app.get("/api/weekly/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Weekly.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Author]
    }).then(function(dbWeekly) {
      res.json(dbWeekly);
    });
  });

  app.post("/api/weekly", function(req, res) {
    db.Weekly.create(req.body).then(function(dbWeekly) {
      res.json(dbWeekly);
    });
  });

  app.delete("/api/weekly/:id", function(req, res) {
    db.Weekly.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbWeekly) {
      res.json(dbWeekly);
    });
  });

  // PUT route for updating posts
  app.put("/api/weekls", function(req, res) {
    db.Weekly.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbWeekly) {
      res.json(dbWeekly);
    });
  });

};
