// Manipulate Google logo
var logo = document.querySelector("#hplogo");

logo.setAttribute("srcset", "https://www.eastcottvets.co.uk/uploads/Animals/gingerkitten.jpg");

logo.style.width = "200px";
logo.style.height = "100px";
logo.style.border = "2px solid purple";

// Manipulate links
var links = document.getElementsByTagName("a");

for(var i = 0; i < links.length; i++) {
	// styles
	links[i].style.background = "pink";
	links[i].style.color = "orange";
	links[i].style.border = "1px dashed purple";

	// links
	// console.log(links[i].getAttribute("href"));
	links[i].setAttribute("href", "http://www.bing.com");
}