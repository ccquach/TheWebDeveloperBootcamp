//check off specific todos by clicking
$("ul").on("click", "li", function() {
	$(this).toggleClass("completed");
});

//click on X to delete todo
$("ul").on("click", "span", function(event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	event.stopPropagation();
});

//add new todo when enter hit in text input
$("input[type='text']").on("keypress", function(event) {
	if(event.which === 13) {
		//get new todo text from input
		var todoText = $(this).val();
		//clear input
		$(this).val("");
		//create new li and add to us
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
	}
});

//toggle text input
$(".fa-plus").on("click", function() {
	$("input[type='text']").fadeToggle();
});