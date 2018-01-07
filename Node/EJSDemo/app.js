var express = require("express");
var app = express();

// serve the contents of the 'public' directory
app.use(express.static("public"));
// express will expect ejs files in res.render();
// avoid having to explicitly use ejs extension when passing parameter
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
	// res.send("<h1>Welcome to the home page!<h1><h2>blah blah</h2>");
});

app.get("/fallinlovewith/:thing", function(req, res) {
	var thing = req.params.thing;
	res.render("love", { thingVar: thing });
	// res.send("you fell in love with " + thing);
});

app.get("/posts", function(req, res) {
	var posts = [
		{ title: "Post 1", author: "Susy" },
		{ title: "My adorable pet bunny", author: "Charlie" },
		{ title: "Can you believe this pomsky?", author: "Colt" }
	];
	res.render("posts", { posts: posts });
});

app.listen(3000, function() {
	console.log("Serving EJS Demo app on Port 3000");
});