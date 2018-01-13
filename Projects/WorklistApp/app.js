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
	account: String,
	firstName: String,
	lastName: String,
	currentBalance: Number,
	created: { type: Date, default: Date.now }
});
var Account = mongoose.model("Account", accountSchema);

Account.create({
	account: "12345678",
	firstName: "John",
	lastName: "Doe",
	currentBalance: 1234.56
});

app.listen(3000, function() {
	console.log("Serving Worklist Application on port 3000");
});