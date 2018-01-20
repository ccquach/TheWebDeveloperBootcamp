var express = require("express");
var router = express.Router({ mergeParams: true });
var Account = require("../models/account");
var Comment = require("../models/comment");

// Comments new
router.get("/new", isLoggedIn, function(req, res) {
	Account.findById(req.params.id, function(err, account) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", { account: account });
		}
	});
});

// Comment create
router.post("/", isLoggedIn, function(req, res) {
	req.body.comment.content = req.sanitize(req.body.comment.content);
	// Find account by Id
	Account.findById(req.params.id, function(err, account) {
		if(err) {
			console.log(err);
		} else {
			// Create new comment
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					console.log(err);
				} else {
					// Connect new comment to account
					account.comments.push(comment._id);
					account.save();
					// Redirect to account show page
					res.redirect("/accounts/" + req.params.id);
				}
			});
		}
	});
});

// middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;