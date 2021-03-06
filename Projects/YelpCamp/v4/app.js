var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground"),
	Comment 	= require("./models/comment"),
	seedDB		= require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v4");
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
			res.render("campgrounds/index", { campgrounds: allCampgrounds });
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
	res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			//render show template with that campground
			res.render("campgrounds/show", { campground: foundCampground });
		}
	});
});

// ===========================================
// COMMENTS ROUTES
// ===========================================
app.get("/campgrounds/:id/comments/new", function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", { campground: campground });
		}
	})
});

app.post("/campgrounds/:id/comments", function(req, res) {
	// Lookup campground using Id
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// Create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					console.log(err);
				} else {
					// Connect new comment to campground
					campground.comments.push(comment._id);
					campground.save();
					// Redirect to campground show page
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}
	});
});

app.listen(3000, function() {
	console.log("Serving YelpCamp App on port 3000");
});