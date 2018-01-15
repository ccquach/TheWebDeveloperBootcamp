var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground"),
	seedDB		= require("./seeds");

mongoose.connect("mongodb://127.0.0.1/yelp_camp_v3", { useMongoClient: true });
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res) {
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
	//get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", { campgrounds: allCampgrounds });
		}
	});
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
	//get data from form and add to campgrounds collection
	var name 	= req.body.name,
		image 	= req.body.image,
		desc 	= req.body.description
	var newCampgound = {
		name: name,
		image: image,
		description: desc
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

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			//render show template with that campground
			res.render("show", { campground: foundCampground });
		}
	});
});

app.listen(3000, function() {
	console.log("Serving YelpCamp App on port 3000");
});