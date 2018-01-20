var mongoose = require("mongoose"),
	Account	 = require("./models/account"),
	Comment	 = require("./models/comment");

var data = [
	{
		number: 12345678,
		firstName: "Harry",
		lastName: "Potter",
		currentBalance: 100.58
	},
	{
		number: 12345679,
		firstName: "Ron",
		lastName: "Weasley",
		currentBalance: 1040.58
	},
	{
		number: 12345680,
		firstName: "Hermione",
		lastName: "Granger",
		currentBalance: 1300.58
	},
];
commentData = [
	{
		content: "Bacon ipsum dolor amet sirloin pastrami doner kevin, pork tenderloin burgdoggen rump. Ribeye boudin cupim, hamburger beef ribs pig pork belly biltong tri-tip tenderloin t-bone capicola tail.",
		author: "Minerva McGonagall"
	},
	{
		content: "Short loin pork belly flank tail, pancetta prosciutto chuck brisket venison capicola. Pork buffalo meatloaf t-bone corned beef tongue ribeye alcatra landjaeger flank fatback picanha burgdoggen capicola pork loin.",
		author: "Severus Snape"
	}
];

function seedDB() {
	// Remove all accounts
	Account.remove({}, function(err) {
		// if(err) {
		// 	console.log(err);
		// }
		// console.log("removed accounts");
		// Comment.remove({}, function(err) {
		// 	if(err) {
		// 		console.log(err);
		// 	}
		// 	console.log("removed comments");
		// 	// Add a few accounts
		// 	data.forEach(function(seed) {
		// 		Account.create(seed, function(err, account) {
		// 			if(err) {
		// 				console.log(err);
		// 			} else {
		// 				console.log("account added");
		// 				// Create comments
		// 				commentData.forEach(function(seed) {
		// 					Comment.create(seed, function(err, comment) {
		// 						if(err) {
		// 							console.log(err);
		// 						} else {
		// 							account.comments.push(comment._id);
		// 							account.save();
		// 							console.log("created new comment");
		// 						}
		// 					});
		// 				});
		// 			}
		// 		});
		// 	});
		// });
	});
}
module.exports = seedDB;