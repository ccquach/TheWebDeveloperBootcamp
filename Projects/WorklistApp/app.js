var expressSanitizer 	= require("express-sanitizer"),
	methodOverride 		= require("method-override"),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	express 			= require("express"),
	moment				= require("moment"),
	app 				= express();

// APP CONFIG
mongoose.connect("mongodb://127.0.0.1/worklist_app", { useMongoClient: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.locals.moment = moment;

// MONGOOSE/MODEL CONFIG
var accountSchema = mongoose.Schema({
	number: String,
	firstName: String,
	lastName: String,
	currentBalance: Number,
	comment: String,
	created: { type: Date, default: Date.now }
});
var Account = mongoose.model("Account", accountSchema);

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
			res.render("index", { accounts: accounts });
		}
	});
});

// NEW ROUTE
app.get("/accounts/new", function(req, res) {
	res.render("new");
});

// CREATE ROUTE
app.post("/accounts", function(req, res) {
	req.body.account.comment = req.sanitize(req.body.account.comment);
	Account.create(req.body.account, function(err, newAccount) {
		if(err) {
			res.render("new");
		} else {
			res.redirect("/accounts");
		}
	});
});

// SHOW ROUTE
app.get("/accounts/:id", function(req, res) {
	Account.findById(req.params.id, function(err, foundAccount) {
		if(err) {
			res.redirect("/accounts");
		} else {
			res.render("show", { account: foundAccount });
		}
	});
});

// EDIT ROUTE
app.get("/accounts/:id/edit", function(req, res) {
	Account.findById(req.params.id, function(err, foundAccount) {
		if(err) {
			res.redirect("/accounts");
		} else {
			res.render("edit", { account: foundAccount });
		}
	});
});

// UPDATE ROUTE
app.put("/accounts/:id", function(req, res) {
	req.body.account.comment = req.sanitize(req.body.account.comment);
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