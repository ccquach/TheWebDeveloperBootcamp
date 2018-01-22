var Account = require("../models/account");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You must be logged in to complete this action.");
	res.redirect("/login");
};

middlewareObj.isAdmin = function(req, res, next) {
	if(req.user.isAdmin) {
		next();
	} else {
		req.flash("error", "You are not authorized to complete this action.");
		res.back();
	}
};

middlewareObj.checkAccountOwnership = function(req, res, next) {
	Account.findById(req.params.id, function(err, foundAccount) {
		if(err || !foundAccount) {
			req.flash("error", "Unable to find account. Please note the account number and contact support.");
			res.back();
		} else {
			if(foundAccount.author.id.equals(req.user._id) || req.user.isAdmin) {
				next();
			} else {
				req.flash("error", "You are not authorized to complete this action.");
				res.back();
			}
		}
	});
};

module.exports = middlewareObj;