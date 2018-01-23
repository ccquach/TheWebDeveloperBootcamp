// PACKAGES
var expressSanitizer 	= require("express-sanitizer"),
	methodOverride 		= require("method-override"),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	express 			= require("express"),
	back				= require("express-back"),
	flash				= require("connect-flash"),
	passport 			= require("passport"),
	LocalStrategy 		= require("passport-local"),
	seedDB				= require("./seeds"),
	moment				= require("moment"),
	app 				= express();

// MONGOOSE MODELS
var Account 			= require("./models/account"),
	Comment 			= require("./models/comment"),
	User 				= require("./models/user");

// REQUIRING ROUTES
var indexRoutes 		= require("./routes/index"),
	accountRoutes 		= require("./routes/accounts"),
	commentRoutes 		= require("./routes/comments");

// APP CONFIGURATION
mongoose.connect("mongodb://127.0.0.1/worklist_app");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = moment;
// seedDB();  //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "I am anything.",
	resave: false,
	saveUninitialized: false
}));
app.use(back());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals = {
		currentUser: req.user,
		success: req.flash("success"),
		error: req.flash("error")
	};
	next();
});

// express routers
app.use(indexRoutes);
app.use("/accounts", accountRoutes);
app.use("/accounts/:id/comments", commentRoutes);

app.listen(3000, function() {
	console.log("Serving Worklist Application on port 3000");
});