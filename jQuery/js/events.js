// $('h1').click(function() {
// 	alert("h1 clicked");
// });

// $('button').click(function() {
// 	// alert("button clicked");
// 	// $(this).css("background", "pink");
// 	var text = $(this).text();
// 	console.log("you clicked " + text);
// });

// $('input[type="text"]').keypress(function(event) {
// 	// console.log(event);
// 	if(event.which === 13) {
// 		alert("you hit enter");
// 	}
// });

$('h1').on('click', function() {
	$(this).css('color', 'purple');
});

$("input[type='text']").on("keypress", function() {
	console.log("key pressed");
});

$("button").on("mouseenter", function() {
	$(this).css("font-weight", "bold");
});

$("button").on("mouseleave", function() {
	$(this).css("font-weight", "normal");
});