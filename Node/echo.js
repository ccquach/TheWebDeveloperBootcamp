// NODE EXERCISE

// Using the command line, create a file "echo.js"
// Inside the file, write a function named echo that takes 2 arguments: a string and a number
// It should print out the string the specified number of times

function echo(str, num) {
	for(var i = 0; i < num; i++) {
		console.log(str);
	}
}

echo("Echo!!!", 10) //should print "Echo!!!" 10 times
echo("Tater Tots", 3) //should print "Tater Tots" 3 times


// Add the above 2 examples to the end of your file
// Lastly, run the contents of the "echo.js" using node