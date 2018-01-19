// PACKAGES
var expressSanitizer 	= require("express-sanitizer"),
	methodOverride 		= require("method-override"),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	express 			= require("express"),
	passport 			= require("passport"),
	LocalStrategy 		= require("passport-local"),
	seedDB				= require("./seeds"),
	moment				= require("moment"),
	app 				= express();

// MONGOOSE MODELS
var Account 			= require("./models/account"),
	Comment 			= require("./models/comment"),
	User 				= require("./models/user");

// APP CONFIGURATION
mongoose.connect("mongodb://127.0.0.1/worklist_app");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.locals.moment = moment;
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "I am anything.",
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

// =============== SHOULD BE LANDING PAGE ===============
app.get("/", function(req, res) {
	res.render("landing", { title: "landing" });
});

// INDEX ROUTE
app.get("/accounts", isLoggedIn, function(req, res) {
	Account.find({}, function(err, accounts) {
		if(err) {
			console.log(err);
		} else {
			res.render("accounts/index", { accounts: accounts });
		}
	});
});

// NEW ROUTE
app.get("/accounts/new", isLoggedIn, function(req, res) {
	res.render("accounts/new");
});

// CREATE ROUTE
app.post("/accounts", isLoggedIn, function(req, res) {
	Account.create(req.body.account, function(err, newAccount) {
		if(err) {
			res.render("accounts/new");
		} else {
			res.redirect("/accounts");
		}
	});
});

// SHOW ROUTE
app.get("/accounts/:id", isLoggedIn, function(req, res) {
	Account.findById(req.params.id).populate("comments").exec(function(err, foundAccount) {
		if(err) {
			res.redirect("/accounts");
		} else {
			res.render("accounts/show", { account: foundAccount });
		}
	});
});

// ============================
// COMMENTS ROUTES
// ============================
app.get("/accounts/:id/comments/new", isLoggedIn, function(req, res) {
	Account.findById(req.params.id, function(err, account) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", { account: account });
		}
	});
});

app.post("/accounts/:id", isLoggedIn, function(req, res) {
	req.body.comment.content = req.sanitize(req.body.comment.content);
	// Find account by Id
	Account.findById(req.params.id, function(err, account) {
		if(err) {
			console.log(err);
		} else {
			// Create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					console.log(err);
				} else {
					// Connect new comment to account
					account.comments.push(comment._id);
					account.save();
					// Redirect to account show page
					res.redirect("/accounts/" + req.params.id);
				}
			});
		}
	});
});

// EDIT ROUTE
app.get("/accounts/:id/edit", isLoggedIn, function(req, res) {
	Account.findById(req.params.id, function(err, foundAccount) {
		if(err) {
			res.redirect("/accounts");
		} else {
			res.render("accounts/edit", { account: foundAccount });
		}
	});
});

// UPDATE ROUTE
app.put("/accounts/:id", isLoggedIn, function(req, res) {
	Account.findByIdAndUpdate(req.params.id, req.body.account, function(err, updatedAccount) {
		if(err) {
			res.redirect("/accounts");
		} else {
			res.redirect("/accounts/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/accounts/:id", isLoggedIn, function(req, res) {
	Account.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/accounts");
		} else {
			res.redirect("/accounts");
		}
	});
});

// ============================
// AUTH ROUTES
// ============================
app.get("/register", isLoggedIn, function(req, res) {
	res.render("register");
});

app.post("/register", isLoggedIn, function(req, res) {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render("/register");
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/accounts");
		});
	});
});

app.get("/login", function(req, res) {
	res.render("login");
});

app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/accounts",
		failureRedirect: "/login"
	}), function(req, res){
});

app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, function() {
	console.log("Serving Worklist Application on port 3000");
});