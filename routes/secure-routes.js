var path = require("path");
let db = require("../models");
let jwt = require("jsonwebtoken");
var router = require('express').Router();



// Routes
// =============================================================

  // Each of the below routes just handles the HTML page that the user gets sent to.
// module.exports = function(app) {
  // index route loads view.html
  router.get("/", function(req, res, next) {
    console.log("HERE")
      if (req.cookies.token) {
        var user = jwt.verify(req.cookies.token, 'your_jwt_secret');
        console.log(user);
        if (user) {
            db.Example.findAll({}).then(function (dbExamples) {
                return res.render(`daily?author_id=${authorId}`) 
            });

        } else {
            return res.sendFile(path.join(__dirname, "../public/index.html"));

        }
    } else {
        return res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  });
  module.exports = router;
