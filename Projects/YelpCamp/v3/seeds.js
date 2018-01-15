var mongoose = require("mongoose")
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Salmon Creek",
		image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
		description: "Lots of salmon here"
	},
	{
		name: "Granite Hill",
		image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
		description: "Lots of granite here"
	},
	{
		name: "Mountain Goat's Rest",
		image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
		description: "Lots of goats here"
	}
];

function seedDB() {
	// Remove all campgrounds
	Campground.remove({}, function(err) {
		if(err) {
			console.log(err);
		}
		console.log("removed campgrounds");
		// Add a few campgrounds
		data.forEach(function(seed) {
			Campground.create(seed, function(err, campground) {
				if(err) {
					console.log(err);
				} else {
					console.log("added a campground");
					// Create a comment
					Comment.create(
						{ 
							text: "This place is great, but I wish there was internet.",
							author: "Homer"
						}, function(err, comment) {
							if(err) {
								console.log(err);
							} else {
								campground.comments.push(comment._id);
								campground.save();
								console.log("created new comment");
							}
						}
					);
				}
			})
		});
	});
}
module.exports = seedDB;