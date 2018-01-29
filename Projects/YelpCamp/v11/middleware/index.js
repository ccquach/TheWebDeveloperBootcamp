var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err || !foundCampground) {
			req.flash("error", "Campground not found.");
			res.redirect("back");
		} else {
			// does user own the campground?
			if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
				next();
			// otherwise, redirect
			} else {
				req.flash("error", "You don't have permission to do that.");
				res.redirect("back");
			}
		}
	});
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if(err || !foundComment) {
			req.flash("error", "Comment not found.");
			res.redirect("back");
		} else {
			// does user own the comment?
			if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
				next();
			// otherwise, redirect
			} else {
				req.flash("error", "You don't have permission to do that.");
				res.redirect("back");
			}
		}
	});
};
	
middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login first!");
	res.redirect("/login");
};

module.exports = middlewareObj;