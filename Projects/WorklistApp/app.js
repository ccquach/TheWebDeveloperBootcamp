var bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	express 	= require("express"),
	app 		= express();

// APP CONFIG
mongoose.connect("mongodb://localhost/worklist_app", { useMongoClient: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

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
	Account.create(req.body.account, function(err, newAccount) {
		if(err) {
			res.render("new");
		} else {
			res.redirect("/accounts");
		}
	});
});

app.listen(3000, function() {
	console.log("Serving Worklist Application on port 3000");
});