var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	content: String,
	author: {
		id: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	created: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Comment", commentSchema);