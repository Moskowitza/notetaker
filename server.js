// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var logger = require("morgan");

var app = express();

// Set the app up with morgan.
// morgan is used to log our HTTP Requests. By setting morgan to 'dev' 
// the :status token will be colored red for server error codes, 
// yellow for client error codes, cyan for redirection codes, 
// and uncolored for all other codes.
app.use(logger("dev"));
// Setup the app with body-parser and a static folder
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.static("public"));

// Database configuration
var databaseUrl = "notetaker";
var collections = ["notes"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Log any mongojs errors to console
db.on("error", function (error) {
  console.log("Database Error:", error);
});

// Routes
// ======

// Simple index route
app.get("/", function (req, res) {
  res.send(index.html);
});

// TODO: You will make six more routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

// 1. Save a note to the database's collection
// POST: /submit
// ===========================================
app.post("/submit", function (req, res) {
  console.log("req " + req.body.title)
  // THIS WORKS
  db.notes.insert({ title: req.body.title, note: req.body.note, created: req.body.created })
});
// 2. Retrieve all notes from the database's collection
// GET: /all
// ====================================================
app.get("/all", function (req, res) {
  db.notes.find({},function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});
// 3. Retrieve one note in the database's collection by it's ObjectId
// TIP: when searching by an id, the id needs to be passed in
// as (mongojs.ObjectId(IdYouWantToFind))
// GET: /find/:id
// ==================================================================
app.get("/find/:id", function (req, res) {
  var id = req.body.id;
  db.notes.findOne({
    _id: mongojs.ObjectId(id)
  }, function (err, doc) {
  })
});
// 4. Update one note in the database's collection by it's ObjectId
// (remember, mongojs.ObjectId(IdYouWantToFind)
// POST: /update/:id
// ================================================================

// 5. Delete one note from the database's collection by it's ObjectId
// (remember, mongojs.ObjectId(IdYouWantToFind)
// GET: /delete/:id
// ==================================================================

// 6. Clear the entire note collection
// GET: /clearall
// ===================================

// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port http://localhost:3000!");
});
