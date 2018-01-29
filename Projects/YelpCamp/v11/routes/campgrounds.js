var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var { isLoggedIn, checkCampgroundOwnership } = middleware;

//INDEX - show all campgrounds
router.get("/", function(req, res) {
	var perPage = 8;
	var pageQuery = parseInt(req.query.page);
	var pageNumber = pageQuery ? pageQuery : 1;

	if(req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		var findObj = { name: regex };
	} else {
		var findObj = {};
	}

	Campground.find(findObj).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err, allCampgrounds) {
		if(err) {
			req.flash("error", "Campgrounds not found.");
			res.redirect("back");
		} else {
			Campground.find(findObj).count().exec(function(err, count) {
				if(err) {
					req.flash("error", "Campgrounds not found.");
					res.redirect("back");
				} else {
					res.render("campgrounds/index", {
						campgrounds: allCampgrounds,
						current: pageNumber,
						pages: Math.ceil(count / perPage),
						page: "campgrounds"
					});
				}
			});
		}
	});
});

//CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req, res) {
	//get data from form and add to campgrounds collection
	var name 	= req.body.name,
		price	= req.body.price,
		image 	= req.body.image,
		desc 	= req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampgound = {
		name: name,
		price: price,
		image: image,
		description: desc,
		author: author
	};
	//create a new campground and save to db
	Campground.create(newCampgound, function(err, newlyCreated) {
		if(err) {
			req.flash("error", "Failed to create new campground.");
			res.redirect("back");
		} else {
			//redirect back to campgrounds page
			console.log(newlyCreated);
			req.flash("success", "New campground added!");
			res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new campground
router.get("/new", isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err || !foundCampground) {
			req.flash("error", "Campground not found.");
			res.redirect("back");
		} else {
			//render show template with that campground
			res.render("campgrounds/show", { campground: foundCampground });
		}
	});
});

//EDIT - show form to edit campground
router.get("/:id/edit", isLoggedIn, checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render("campgrounds/edit", { campground: foundCampground });
	});
});

//UPDATE - apply edits to DB
router.put("/:id", isLoggedIn, checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if(err) {
			req.flash("error", "Failed to update campground.");
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground updated!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY - delete campground
router.delete("/:id", isLoggedIn, checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			req.flash("error", "Failed to delete campground.");
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground deleted!");
			res.redirect("/campgrounds");
		}
	});
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router