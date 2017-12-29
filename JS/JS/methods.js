// Adding methods to an object & Namespacing
var dog = {
	name: "buddy",
	breed: "terrier",
	age: 10,
	speak: function() {
		return "woof";
	}
};

var cat = {
	name: "coco",
	breed: "spaniel",
	age: 11,
	speak: function() {
		return "meow";
	}
};

console.log(dog.speak());
console.log(cat.speak());

// this Keyword
var comments = {};
comments.data = ["Good job!", "Bye", "Lame..."];
comments.print = function() {
	this.data.forEach(function(comment) {
		console.log(comment);
	});
}

comments.print();