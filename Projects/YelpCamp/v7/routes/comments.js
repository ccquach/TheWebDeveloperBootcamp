var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Comments new
router.get("/new", isLoggedin, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", { campground: campground });
		}
	})
});

// Comments create
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
					// Connect new comment to campground
					campground.comments.push(comment._id);
					campground.save();
					// Redirect to campground show page
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
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

module.exports = router;