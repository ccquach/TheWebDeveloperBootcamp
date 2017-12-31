// ********* Fading *********

// $("button").on("click", function() {
// 	// $("div").fadeOut(1000, function() {
// 	// 	$(this).remove();
// 	// });

// 	// $("div").fadeIn(1000);

// 	$("div").fadeToggle(2000);
// });

// ********* Sliding *********
$("button").on("click", function() {
	// $("div").slideDown();
	// $("div").slideUp();
	$("div").slideToggle(1000, function() {
		// console.log("slide is done");
		$(this).remove();
	});
});