// *** getElementById ***
var tag = document.getElementById("highlight");

// console.log(tag);
// console.dir(tag);

// *** getElementsByClassName ***
var tags = document.getElementsByClassName("bolded");

// console.log(tags);
// console.log(tags[0]);
// console.log(tags[1]);
// console.log(tags.length);
// console.dir(tags);

// *** getElementsByTagName ***
var tags = document.getElementsByTagName("li");
var h1 = document.getElementsByTagName("h1");
var body = document.getElementsByTagName("body")[0];
var head = document.getElementsByTagName("head")[0];

// console.log(tags);
// console.log(tags[0]);
// console.log(tags[1]);
// console.log(tags[2]);
// console.log(tags.length);
// console.dir(tags);

// *** querySelector ***
// select by ID
var tag = document.querySelector("#highlight");
// select by Class
var tag = document.querySelector(".bolded");
// select by Tag
var tag = document.querySelector("h1");

// *** querySelectorAll ***
// select by Tag
var tags = document.querySelectorAll("h1");
// select by Class
var tags = document.querySelectorAll(".bolded");