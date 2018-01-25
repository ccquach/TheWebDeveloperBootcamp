var mongoose = require("mongoose")
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Salmon Creek",
		image: "https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec est tortor, tempor vitae suscipit vitae, consectetur sed lorem. Donec nisl dui, commodo ut lacinia nec, egestas nec arcu. Vestibulum tristique quis ligula semper tincidunt. Phasellus sodales pulvinar odio, quis commodo quam laoreet vel. Fusce sed lacus eget dui molestie suscipit ut id tortor. In gravida metus nec erat lacinia eleifend. Phasellus sagittis eleifend augue vitae interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac lectus nec orci ornare aliquet."
	},
	{
		name: "Granite Hill",
		image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec est tortor, tempor vitae suscipit vitae, consectetur sed lorem. Donec nisl dui, commodo ut lacinia nec, egestas nec arcu. Vestibulum tristique quis ligula semper tincidunt. Phasellus sodales pulvinar odio, quis commodo quam laoreet vel. Fusce sed lacus eget dui molestie suscipit ut id tortor. In gravida metus nec erat lacinia eleifend. Phasellus sagittis eleifend augue vitae interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac lectus nec orci ornare aliquet."
	},
	{
		name: "Mountain Goat's Rest",
		image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec est tortor, tempor vitae suscipit vitae, consectetur sed lorem. Donec nisl dui, commodo ut lacinia nec, egestas nec arcu. Vestibulum tristique quis ligula semper tincidunt. Phasellus sodales pulvinar odio, quis commodo quam laoreet vel. Fusce sed lacus eget dui molestie suscipit ut id tortor. In gravida metus nec erat lacinia eleifend. Phasellus sagittis eleifend augue vitae interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac lectus nec orci ornare aliquet."
	}
];

function seedDB() {
	// Remove all campgrounds
	Campground.remove({}, function(err) {
		if(err) {
			console.log(err);
		}
		console.log("removed campgrounds");
		Comment.remove({}, function(err) {
			if(err) {
				console.log(err);
			}
			console.log("removed comments");
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
	});
}
module.exports = seedDB;