// variables
var p1Button = document.querySelector("#p1Button");
var p2Button = document.querySelector("#p2Button");
var resetButton = document.querySelector("#reset");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var winningScoreDisplay = document.querySelector("p span");
var numInput = document.querySelector("input[type='number']");

var p1Score = 0;
var p2Score = 0;
var winningScore = 5;
var gameOver = false;

// update p1 score
p1Button.addEventListener("click", function() {
	if(!gameOver) {
		p1Score++;
		p1Display.textContent = p1Score;
		if(p1Score === winningScore) {
			gameOver = true;
			p1Display.classList.add("winner");
		}
	}
});

// update p2 score
p2Button.addEventListener("click", function() {
	if(!gameOver) {
		p2Score++;
		p2Display.textContent = p2Score;
		if(p2Score === winningScore) {
			gameOver = true;
			p2Display.classList.add("winner");
		}
	}
});

// reset scores
resetButton.addEventListener("click", function() {
	reset();
});

function reset() {
	gameOver = false;
	p1Score = 0;
	p2Score = 0;
	p1Display.textContent = 0;
	p2Display.textContent = 0;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
}

// change winning score
numInput.addEventListener("change", function() {
	if(this.value > 0) {
		winningScore = Number(this.value);
		winningScoreDisplay.textContent = winningScore;
		reset();
	}
});