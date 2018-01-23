var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
const { isAdmin } = middleware;

// Root route
router.get("/", function(req, res) {
	res.render("landing");
});

// ============================
// AUTH ROUTES
// ============================
// show registration form
router.get("/register", isAdmin, function(req, res) {
	res.render("register");
});

// handle sign up logic
router.post("/register", isAdmin, function(req, res) {
	var newUser = new User({ username: req.body.username });
	if(req.body.adminCode === "pass1") {
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		req.flash("success", "Registration completed for new user.");
		res.back();
		// passport.authenticate("local")(req, res, function() {
		// 	res.redirect("/accounts");
		// });
	});
});

// show login form
router.get("/login", function(req, res) {
	res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/accounts",
		failureRedirect: "/login"
	}), function(req, res){
});

// logout route
router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "You have been successfully logged out.");
	res.redirect("/");
});

module.exports = router;