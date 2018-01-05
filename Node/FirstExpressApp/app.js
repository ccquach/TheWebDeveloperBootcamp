var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res) {
	res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
	res.send("Goodbye!");
});

// "/dog" => "meow"
app.get("/dog", function(req, res) {
	console.log("someone made a request to /dog");
	res.send("meow");
});

app.get("/r/:subredditName", function(req, res) {
	var subreddit = req.params.subredditName;
	res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
	console.log(req.params);
	res.send("WELCOME TO THE COMMENTS PAGE!");
});


app.get("*", function(req, res) {
	res.send("you are a star!");
});

// Tell Express to listen for requests (start server)
app.listen(3000, function() {
	console.log("Serving app on port 3000");
});