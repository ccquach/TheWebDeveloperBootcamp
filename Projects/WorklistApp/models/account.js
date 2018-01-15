var mongoose = require("mongoose");

var accountSchema = mongoose.Schema({
	number: String,
	firstName: String,
	lastName: String,
	currentBalance: Number,
	created: { type: Date, default: Date.now },
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});
module.exports = mongoose.model("Account", accountSchema);