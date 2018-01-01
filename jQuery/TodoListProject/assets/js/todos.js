//check off specific todos by clicking
$("li").on("click", function() {
	$(this).toggleClass("completed");
});

//click on X to delete todo
$("span").on("click", function(event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	event.stopPropagation();
});