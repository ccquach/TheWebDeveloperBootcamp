var express = require("express");
var router = express.Router({ mergeParams: true });
var Account = require("../models/account");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
	Account.findById(req.params.id, function(err, account) {
		if(err || !account) {
			req.flash("error", "Unable to find account.")
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
			res.back();
		} else {
			// Create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					req.flash("error", "Failed to add new comment.");
					res.back();
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

// Comment edit
router.get("/:comment_id/edit", middleware.isAdmin, function(req, res) {
	Account.findById(req.params.id, function(err, foundAccount) {
		if(err || !foundAccount) {
			req.flash("error", "Account not found.");
			return res.back();
		}
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err || !foundComment) {
				req.flash("error", "Comment not found.");
				return res.back();
			}
			res.render("comments/edit", { account_id: req.params.id, comment: foundComment });
		});
	});
});

// Comment update
router.put("/:comment_id", middleware.isAdmin, function(req, res) {
	req.body.comment.content = req.sanitize(req.body.comment.content);
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if(err) {
			req.flash("error", "Failed to update comment.");
			res.back();
		} else {
			req.flash("success", "Successfully updated comment.");
			res.redirect("/accounts/" + req.params.id);
		}
	});
});

// Comment destroy
router.delete("/:comment_id", middleware.isAdmin, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if(err) {
			req.flash("error", "Failed to delete comment.");
			res.back();
		} else {
			req.flash("success", "Successfully deleted comment.");
			res.redirect("/accounts/" + req.params.id);
		}
	});
});

module.exports = router;