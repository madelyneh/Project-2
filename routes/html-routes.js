// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
let db = require("../models");
let jwt = require("jsonwebtoken");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

  // cms route loads cms.html
  app.get("/daily", function(req, res) {
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
      res.render("weekly", {
        example: dbExample
      });
    });
  });


  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/blog.html"));
    
  });

  // authors route loads author-manager.html
  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

  app.get("/post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  app.get("/weekly-post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/weekly.html"));
  });

};
