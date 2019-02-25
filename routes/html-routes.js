// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var jwt = require("jsonwebtoken");
// var router = require('express').Router();



// Routes
// =============================================================

  // Each of the below routes just handles the HTML page that the user gets sent to.
// module.exports = function(app) {
  // index route loads view.html
  // router.get("/", function(req, res) {
  //   console.log("HERE")
  //     if (req.cookies.token) {
  //       var user = jwt.verify(req.cookies.token, 'your_jwt_secret');
  //       console.log(user);
  //       if (user) {
  //           db.Example.findAll({}).then(function (dbExamples) {
  //               return res.render(`daily?author_id=${authorId}`) 
  //           });

  //       } else {
  //           return res.sendFile(path.join(__dirname, "../public/index.html"));

  //       }
  //   } else {
  //       return res.sendFile(path.join(__dirname, "../public/index.html"));
  //   }
  // });
module.exports = function(app) {

  // cms route loads cms.html
  app.get("/daily", function(req, res) {
    console.log("HERE");
    // res.sendFile(path.join(__dirname, "../public/cms.html"));
    db.Post.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("daily", {
        example: dbExample
        
      });
    });
  });

  app.get("/weekly", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/cms.html"));
    db.Post.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
			console.log('TCL: dbExample', dbExample)
      
      res.render("weekly", {
        example: dbExample
      });
    });
  });


  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/blog.html"));
    
  });

  app.get("/post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  app.get("/weekly-post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/weekly.html"));
  });
}
// module.exports = router;
