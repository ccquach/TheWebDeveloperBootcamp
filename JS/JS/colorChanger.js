// Toggle the body's background color between purple and white, when a button is clicked

// *** METHOD 1 ***
var btn = document.querySelector("button");

btn.addEventListener("click", function() {
	document.body.classList.toggle("purple");
});


// *** METHOD 2 ***
// var btn = document.querySelector("button");
// var isPurple = false;

// btn.addEventListener("click", function() {
// 	if(isPurple) {
// 		document.body.style.background = "white";
// 	} else {
// 		document.body.style.background = "purple";
// 	}
// 	isPurple = !isPurple;
// });