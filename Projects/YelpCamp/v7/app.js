var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	Campground 		= require("./models/campground"),
	Comment 		= require("./models/comment"),
	User			= require("./models/user"),
	seedDB			= require("./seeds");

// requiring routes
var indexRoutes 	 = require("./routes/index"),
	commentRoutes 	 = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds");

mongoose.connect("mongodb://localhost/yelp_camp_v7");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

// express router
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, function() {
	console.log("Serving YelpCamp App on port 3000");
});