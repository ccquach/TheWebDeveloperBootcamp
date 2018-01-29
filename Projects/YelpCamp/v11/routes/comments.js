var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var { isLoggedIn, checkCommentOwnership } = middleware;

// new
router.get("/new", isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			req.flash("error", "Campground not found.");
			res.redirect("back");
		} else {
			res.render("comments/new", { campground: campground });
		}
	});
});

// create
router.post("/", isLoggedIn, function(req, res) {
	// Lookup campground using Id
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			req.flash("error", "Campground not found.");
			res.redirect("/campgrounds");
		} else {
			// Create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					req.flash("error", "Something went wrong when trying to add a new comment.");
					res.redirect("back");
					console.log(err);
				} else {
					// Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// Save comment
					comment.save();
					// Connect new comment to campground
					campground.comments.push(comment._id);
					campground.save();
					console.log(comment);
					// Redirect to campground show page
					req.flash("success", "Successfully added comment!");
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}
	});
});

// edit
router.get("/:comment_id/edit", isLoggedIn, checkCommentOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err || !foundCampground) {
			req.flash("error", "Campground not found.");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err) {
				req.flash("error", "Comment not found.");
				res.redirect("back");
			} else {
				res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
			}
		});
	});
});

// update
router.put("/:comment_id", isLoggedIn, checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if(err) {
			req.flash("error", "Comment not found.");
			res.redirect("back");
		} else {
			console.log(updatedComment);
			req.flash("success", "Comment updated!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// destroy
router.delete("/:comment_id", isLoggedIn, checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if(err) {
			req.flash("error", "Failed to delete comment.");
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted.");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;