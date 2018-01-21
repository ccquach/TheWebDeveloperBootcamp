var express = require("express");
var router = express.Router({ mergeParams: true });
var Account = require("../models/account");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
	Account.findById(req.params.id, function(err, account) {
		if(err) {
			res.back();
		} else {
			res.render("comments/new", { account: account });
		}
	});
});

// Comment create
router.post("/", middleware.isLoggedIn, function(req, res) {
	req.body.comment.content = req.sanitize(req.body.comment.content);
	// Find account by Id
	Account.findById(req.params.id, function(err, account) {
		if(err) {
			console.log(err);
		} else {
			// Create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					req.flash("error", "Failed to add new comment.");
					console.log(err);
				} else {
					// Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// Save comment
					comment.save();
					// Connect new comment to account
					account.comments.push(comment._id);
					account.save();
					// Redirect to account show page
					req.flash("success", "Successfully added new comment.");
					res.redirect("/accounts/" + req.params.id);
				}
			});
		}
	});
});

module.exports = router;