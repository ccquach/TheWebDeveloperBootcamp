var todoList = [];
var action = prompt("What would you like to do?");

while(action !== "quit") {
	// handle input
	if(action === "new") {
		// ask for new todo
		var newTodo = prompt("Enter a new todo");
		// add to todos array
		todoList.push(newTodo);
	}
	else if(action === "list") {
		console.log(todoList);
	}
	// ask again for new input
	action = prompt("What would you like to do?");
}
console.log("OK, YOU QUIT THE APP");