var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root route
router.get("/", function(req, res) {
	res.render("landing", { title: "landing" });
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
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render("/register");
		}
		res.redirect("back");
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
	res.redirect("/");
});

// middleware
function isAdmin(req, res, next) {
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

module.exports = router;