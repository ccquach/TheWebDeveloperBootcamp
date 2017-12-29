var todoList = [];
var action = prompt("What would you like to do?");

while(action !== "quit") {
	// handle input
	if(action === "list") {
		listTodos();
	} else if(action === "new") {
		addTodo();
	} else if(action === "delete") {
		deleteTodo();
	}
	// ask again for new input
	action = prompt("What would you like to do?");
}
console.log("OK, YOU QUIT THE APP");

function listTodos() {
	console.log("**********");
	todoList.forEach(function(todo, i) {
		console.log(i + ": " + todo);
	});
	console.log("**********");
}

function addTodo() {
	// ask for new todo
	var newTodo = prompt("Enter a new todo");
	// add to todos array
	todoList.push(newTodo);
	console.log("Added Todo");
}

function deleteTodo() {
	// ask for index of todo to be deleted
	var index = prompt("Enter index of todo to delete");
	// delete that todo
	todoList.splice(index, 1);
	console.log("Deleted Todo");
}