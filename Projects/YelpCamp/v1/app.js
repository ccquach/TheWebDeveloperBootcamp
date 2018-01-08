var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgrounds = [
	{
		name: "Salmon Creek",
		image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"
	},
	{
		name: "Granite Hill",
		image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"
	},
	{
		name: "Mountain Goat's Rest",
		image: "https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg"
	}
];

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCampgound = {
		name: name,
		image: image
	}
	campgrounds.push(newCampgound);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(3000, function() {
	console.log("Serving YelpCamp App on port 3000");
});