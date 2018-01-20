var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// new
router.get("/new", isLoggedin, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", { campground: campground });
		}
	})
});

// create
router.post("/", isLoggedin, function(req, res) {
	// Lookup campground using Id
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// Create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
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
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}
	});
});

// edit
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if(err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
		}
	});
});

// update
router.put("/:comment_id", checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// destroy
router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//middleware
function isLoggedin(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkCommentOwnership(req, res, next) {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err) {
				res.redirect("back");
			} else {
				// does user own the comment?
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				// otherwise, redirect
				} else {
					res.redirect("back");
				}
			}
		});
	// if not, redirect
	} else {
		res.redirect("back");
	}
}

module.exports = router;