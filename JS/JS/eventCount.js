// Count the number of events on the MDN Event Reference page

// *** SIMPLE METHOD ***
var rows = document.querySelectorAll("tr").length;
var headers = document.querySelectorAll("table").length;
var ps = document.querySelectorAll("h3 + p a").length;

var total = rows - headers + ps;
console.log(total);


// *** MY METHOD ***
// var total = 0;
// var headerTotal = 0;

// paragraphs (23)
// var ps = document.querySelectorAll("h3 + p a");
// total += ps.length;

// METHOD 1: count headers (24)
// var rows = document.querySelectorAll("tr");
// for(var i = 0; i < rows.length; i++) {
// 	var header = rows[i].querySelector("th");
// 	if(header !== null) {
// 		headerTotal++;
// 	}
// }
// // exclude headers
// total += rows.length - headerTotal;

// METHOD 2: table rows
// var rows = document.querySelectorAll("tr");
// for(var i = 0; i < rows.length; i++) {
// 	var event = rows[i].querySelector("td");
// 	// only include rows with td element
// 	if(event !== null) {
// 		total++;
// 	}
// }

// console.log(total);