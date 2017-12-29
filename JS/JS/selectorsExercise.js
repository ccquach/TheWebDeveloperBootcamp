// Come up with 4 different ways to select the first <p> tag
var methodOne = document.getElementById("first");
var methodTwo = document.getElementsByClassName("special")[0];
var methodThree = document.querySelector("#first");
var methodFour = document.querySelector("p");
var methodFive = document.querySelector(".special");
var methodSix = document.getElementsByTagName("p")[0];
var methodSeven = document.querySelector("h1 + p");
var methodEight = document.querySelectorAll("p")[0];
var methodNine = document.querySelectorAll(".special")[0];