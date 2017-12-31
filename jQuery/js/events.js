$('h1').click(function() {
	alert("h1 clicked");
});

$('button').click(function() {
	// alert("button clicked");
	// $(this).css("background", "pink");
	var text = $(this).text();
	console.log("you clicked " + text);
});

$('input[type="text"]').keypress(function(event) {
	// console.log(event);
	if(event.which === 13) {
		alert("you hit enter");
	}
});