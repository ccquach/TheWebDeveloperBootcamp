var answer = prompt("Are we there yet?").toLowerCase();

// VERSION 1
// while(answer !== "yes" && answer !== "yeah") {
// 	var answer = prompt("Are we there yet?");
// }


// VERSION 2 - BONUS
while(answer.indexOf("yes") === -1 && answer !== "yeah") {
	var answer = prompt("Are we there yet?").toLowerCase();
}

alert("Yay, we finally made it!");