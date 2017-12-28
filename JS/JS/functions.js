// isEven
// function isEven(x) {
// 	if(x % 2 === 0) {
// 		return true;
// 	}
// 	return false;
// }

function isEven(x) {
	return x % 2 === 0;
}

isEven(4); //true
isEven(21); //false
isEven(68); //true
isEven(333); //false

// factorial
function factorial(x) {
	// define a result variable
	var result = 1;
	// calculate factorial and store value in result
	for(var i = 2; i <= x; i++) {
		result *= i;
	}
	// return the result variable
	return result;
}

factorial(5); //120
factorial(2); //2
factorial(10); //3628800
factorial(0); //1

// kebabToSnake
function kebabToSnake(str) {
	return str.replace(/-/g, "_");		// global replacement
}

kebabToSnake("hello-world"); //"hello_world"
kebabToSnake("dogs-are-awesome"); //"dogs_are_awesome"
kebabToSnake("blah"); //"blah"