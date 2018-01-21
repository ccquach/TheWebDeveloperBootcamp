var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if(err) {
				res.redirect("back");
			} else {
				// does user own the campground?
				if(foundCampground.author.id.equals(req.user._id)) {
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

middlewareObj.checkCommentOwnership = function(req, res, next) {
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

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login first!");
	res.redirect("/login");
}

module.exports = middlewareObj;