//check off specific todos by clicking
$("li").on("click", function() {
	$(this).toggleClass("completed");
});