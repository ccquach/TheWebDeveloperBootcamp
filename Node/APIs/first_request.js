var request = require("request");
request("http://www.google.com", function(error, response, body) {
	if(!error && response.statusCode == 200) {
		console.log(body); //show the HTML for the Google homepage
	}

	// if(error) {
	// 	console.log("something went wrong");
	// 	console.log(error);
	// } else {
	// 	if(response.statusCode == 200) {
	// 		//things worked
	// 		console.log(body);
	// 	}
	// }
});