// DELETE THIS ONE

let db = require("../models");
let router = require('express').Router();

// Get all examples
router.get("/", function(request, response, next) {
  // access the user on authenticated routes

  console.log("Authenticated user: " + JSON.stringify(request, response));
  db.Example.findAll({}).then(function(dbExamples) {
    request.json(dbExamples);
  });
});

// create new 
router.post("/", function(request, response, next) {
  db.Example.create(request.body).then(function(dbExample) {
    response.json(dbExample);
  });
});

// delete by id
router.delete("/:id", function(request, response, next) {
  db.Example.destroy({ where: { id: request.params.id } }).then(function(dbExample) {
    response.json(dbExample);
  });
})

module.exports = router;