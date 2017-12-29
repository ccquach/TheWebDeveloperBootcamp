var movies = [];

movies[0] = {
	title: "It Happend One Night",
	rating: 4.5,
	hasWatched: false
};
movies[1] = {
	title: "The Philadelphia Story",
	rating: 5,
	hasWatched: false
};
movies[2] = {
	title: "Crazy, Stupid, Love",
	rating: 3.5,
	hasWatched: true
};
movies[3] = {
	title: "The Proposal",
	rating: 3,
	hasWatched: true
};

movies.forEach(function(movie) {
	console.log(buildString(movie));
});

function buildString(movie) {
	var result = "You have ";
	if(movie.hasWatched) {
		result += "watched ";
	} else {
		result += "not seen ";
	}
	result += "\"" + movie.title + "\" - ";
	result += movie.rating + " stars";
	return result;
}