var mongoose = require("mongoose");

var accountSchema = new mongoose.Schema({
	number: String,
	firstName: String,
	lastName: String,
	currentBalance: Number,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});
module.exports = mongoose.model("Account", accountSchema);