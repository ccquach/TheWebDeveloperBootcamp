var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.render("home.ejs");
	// res.send("<h1>Welcome to the home page!<h1><h2>blah blah</h2>");
});

app.get("/fallinlovewith/:thing", function(req, res) {
	var thing = req.params.thing;
	res.render("love.ejs", { thingVar: thing });
	// res.send("you fell in love with " + thing);
});

app.listen(3000, function() {
	console.log("Serving EJS Demo app on Port 3000");
});