#Intro to Node

* What is Node?
	* Allows us to run JavaScript on server side
* Why are we learning it?
	* It's popular!
	* It's in JavaScript!
* (it doesn't matter (long-term))
	* Not here to learn languages; here to learn web development
	* Will be required to learn different languages throughout careers

#Using Node

* Interact with Node Console
* Run a file with Node
	* node <filename>



#Intro to NPM

* Define NPM
	* Package (Library) manager for JavaScript
* Explain why NPM is awesome
	* Easy to use: node install [package_name]
	* Centralized repository of 200k+ packages
* Intro the package we will end up using
	* express
	* mongoose
	* morgan
	* ejs
	* bodyparser
	* cookieparser
	* passport

#Installing and Using Packages

* Use 'npm install' to install a package
* Use 'require()' to include a package



#Introduction to Express

* What is a framework? How is it different from a library?
	* Both are external code that you include in your app
	* Inversion of control:
		* You call a library (method)
		* Framework calls you 
			* Decisions made for you that you must abide by in 
			  order to use the framework
	* Framework pre-packages all basic things you need to set up an app
		* Allows you to focus on content of app
* What is Express?
	* Web development framework
* Why are we using Express?
	* The most popular node web dev framework (large community)
	* heavyweight vs lightweight framework
		* Express is lightweight: doesn't do much for you (flexible)
			* Less is hidden from you, meaning you have to understand
			  how things work in order to get things done



#NPM Init and Package.json

* Use the '--save' flag to install packages
	* Installs package and adds package name and version to dependencies 
	  section of package.json
* Explain what the package.json file does
	* Holds metadata relevant to specific project (e.g. dependencies)
* Use 'npm init' to create a new package.json
	* Allows us to add dependencies metadata to a project using --save 
	  flag when installing packages



#More Routing!

* Show the * route matcher
* Write routes containing route parameters
* Discuss route order



#Rendering HTML and Templates

* Use res.render() to render HTML (from an EJS file)
* Explain what EJS (Embedded JavaScript) is and why we use it
* Pass variables to EJS templates