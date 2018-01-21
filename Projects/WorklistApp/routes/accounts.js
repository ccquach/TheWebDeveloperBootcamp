var express = require("express");
var router = express.Router();
var Account = require("../models/account");
var middleware = require("../middleware");

// INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res) {
	Account.find({}, function(err, accounts) {
		if(err) {
			console.log(err);
		} else {
			res.render("accounts/index", { accounts: accounts });
		}
	});
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("accounts/new");
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
	// New account
	var newAccount = req.body.account;
	// Add user id and username to account
	newAccount.author = {
		id: req.user._id,
		username: req.user.username
	};
	// Create new account
	Account.create(newAccount, function(err, newAccount) {
		if(err) {
			res.render("accounts/new");
		} else {
			console.log(newAccount);
			res.redirect("/accounts");
		}
	});
});

// SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res) {
	Account.findById(req.params.id).populate("comments").exec(function(err, foundAccount) {
		if(err) {
			res.redirect("/accounts");
		} else {
			res.render("accounts/show", { account: foundAccount });
		}
	});
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkAccountOwnership, function(req, res) {
	Account.findById(req.params.id, function(err, foundAccount) {
		res.render("accounts/edit", { account: foundAccount });
	});
});

// UPDATE ROUTE
router.put("/:id", middleware.checkAccountOwnership, function(req, res) {
	Account.findByIdAndUpdate(req.params.id, req.body.account, function(err, updatedAccount) {
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/accounts/" + req.params.id);
		}
	});
});

// DELETE ROUTE
router.delete("/:id", middleware.checkAccountOwnership, function(req, res) {
	Account.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/accounts");
		}
	});
});

module.exports = router;