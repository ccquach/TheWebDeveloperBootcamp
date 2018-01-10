var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// {
// 	name: "Granite Hill",
// 	image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"

// }, function(err, campground) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY CREATED CAMPGROUND: ");
// 		console.log(campground);
// 	}
// });

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	//get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds", { campgrounds: allCampgrounds });
		}
	});
});

app.post("/campgrounds", function(req, res) {
	//get data from form and add to campgrounds collection
	var name = req.body.name;
	var image = req.body.image;
	var newCampgound = {
		name: name,
		image: image
	}
	//create a new campground and save to db
	Campground.create(newCampgound, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(3000, function() {
	console.log("Serving YelpCamp App on port 3000");
});