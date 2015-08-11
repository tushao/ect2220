var app = {};

app.init = function(){
	console.log("App is initialized...");

	app.populateDiv();
};


app.populateDiv = function(){
	
	var html = ""; 	//create a variable called html then set it to be empty...

	html = "<h2>Dynamic HTML Header</h2>";
	html += "<p>Anything I put here will be interpreted as HTML as long as I use the .html() function of the DOM element.</p>";

	//also add an href tag as a button to see if we can make it clickable
	html += "<a href='#' id='dynamic-button-1' class='button'>Click me</a>";

	//output to the DOM element using the ID
	$("#html-output").html(html);

	//once html has been outputted we can find the button and add an event handler to it
	$("#dynamic-button-1").on("click", function(){
		alert("clickity click click");
	});
};
