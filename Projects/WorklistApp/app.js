var expressSanitizer 	= require("express-sanitizer"),
	methodOverride 		= require("method-override"),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	express 			= require("express"),
	seedDB				= require("./seeds"),
	moment				= require("moment"),
	app 				= express();

// MONGOOSE MODELS
var Account = require("./models/account"),
	Comment = require("./models/comment"),
	User 	= require("./models/user");

// APP CONFIG
mongoose.connect("mongodb://127.0.0.1/worklist_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.locals.moment = moment;
seedDB();

// RESTful ROUTES
app.get("/", function(req, res) {
	res.redirect("/accounts");
});

// INDEX ROUTE
app.get("/accounts", function(req, res) {
	Account.find({}, function(err, accounts) {
		if(err) {
			console.log(err);
		} else {
			res.render("accounts/index", { accounts: accounts });
		}
	});
});

// NEW ROUTE
app.get("/accounts/new", function(req, res) {
	res.render("accounts/new");
});

// CREATE ROUTE
app.post("/accounts", function(req, res) {
	req.body.account.comment = req.sanitize(req.body.account.comment);
	Account.create(req.body.account, function(err, newAccount) {
		if(err) {
			res.render("accounts/new");
		} else {
			res.redirect("/accounts");
		}
	});
});

// SHOW ROUTE
app.get("/accounts/:id", function(req, res) {
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
app.get("/accounts/:id/comments/new", function(req, res) {
	Account.findById(req.params.id, function(err, account) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", { account: account });
		}
	});
});

app.post("/accounts/:id", function(req, res) {
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
app.get("/accounts/:id/edit", function(req, res) {
	Account.findById(req.params.id, function(err, foundAccount) {
		if(err) {
			res.redirect("/accounts");
		} else {
			res.render("accounts/edit", { account: foundAccount });
		}
	});
});

// UPDATE ROUTE
app.put("/accounts/:id", function(req, res) {
	Account.findByIdAndUpdate(req.params.id, req.body.account, function(err, updatedAccount) {
		if(err) {
			res.redirect("/accounts");
		} else {
			res.redirect("/accounts/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/accounts/:id", function(req, res) {
	Account.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/accounts");
		} else {
			res.redirect("/accounts");
		}
	});
});

app.listen(3000, function() {
	console.log("Serving Worklist Application on port 3000");
});