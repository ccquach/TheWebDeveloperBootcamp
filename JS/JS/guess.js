// Create secret number
var secretNumber = 4;

// Ask user for guess
var stringGuess = prompt("Guess a number");
var guess = Number(stringGuess);

// Check if guess is right
if (guess === secretNumber) {
	alert("YOU GOT IT RIGHT!");
}
// Otherwise, check if higher
else if (guess > secretNumber) {
	alert("Too high. Guess again!");
}
// Otherwise, guess is lower
else {
	alert("Too low. Guess again!");
}