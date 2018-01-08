var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
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
	res.render("campgrounds", { campgrounds: campgrounds });
});


app.listen(3000, function() {
	console.log("Serving YelpCamp App on port 3000")
});