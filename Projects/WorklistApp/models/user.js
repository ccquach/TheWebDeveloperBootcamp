var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});
module.exports = mongoose.model("User", userSchema);