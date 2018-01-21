var Account = require("../models/account");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

middlewareObj.isAdmin = function(req, res, next) {
	if(req.isAuthenticated()) {
		if(req.user.username === "admin") {
			next();
		} else {
			res.redirect("back");
		}
	} else {
		res.redirect("back");
	}
}

middlewareObj.checkAccountOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Account.findById(req.params.id, function(err, foundAccount) {
			if(err) {
				res.redirect("back");
			} else {
				if(foundAccount.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

module.exports = middlewareObj;