var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//connect to a DB
mongoose.connect("mongodb://localhost/cat_app", { useMongoClient: true });

//define what a cat looks like
var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});
//compile schema to model
var Cat = mongoose.model("Cat", catSchema);

// //adding a new cat to the DB
Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"
}, function(err, cat) {
	if(err) {
		console.log(err);
	} else {
		console.log(cat);
	}
});

// var george = new Cat({
// 	name: "Mrs. Norris",
// 	age: 7,
// 	temperament: "Evil"
// });

// george.save(function(err, cat) {
// 	if(err) {
// 		console.log("SOMETHING WENT WRONG!");
// 	} else {
// 		console.log("WE JUST SAVED A CAT TO THE DB:");
// 		console.log(cat);
// 	}
// });

//retrieve all cats from the DB and console.log each one
Cat.find({}, function(err, cats) {
	if(err) {
		console.log("OH NO, ERROR!");
		console.log(err);
	} else {
		console.log("ALL THE CATS.....");
		console.log(cats);
	}
});