/*
IN-CLASS 5
This session we will cover:
- implementing css circles in our intro
- handling navigation to different pages
- using if/then conditionals
- setting up a model-controller setup
- implementing custom data-id properties on <div> or <a> tags
- getting target.getAttribute('data-id') from a click event handler

Resources:
- http://davidwalsh.name/css-circles
- http://stackoverflow.com/questions/11759358/selecting-custom-data-attributes-in-jquery
*/


var app = {};

app.initialize = function(){
	$.afui.launch();
	app.showPeople();
};

app.showPeople = function(filter){

	//dynamically create html to out person information
	var htmlOutput = "<ul class='list'>";
	for(var x=0; x<peopleListLarge.length; x++){

			htmlOutput += "<li>";
			htmlOutput += peopleListLarge[x].fname + " " + peopleListLarge[x].lname;
			htmlOutput += "</li>";

	}
	htmlOutput += "</ul>";

	$("#peopleList-output").html(htmlOutput);
}



var peopleListLarge = [
	{
		"fname": "Hugh",
		"lname": "Jazz",
		"phone": "917-222-2222",
		"email": "Hugh@hotmail.com",
		"address": {
			"street": "1313 Mockingbird Lane",
			"zip": "911911",
			"country": "US"
			},
		"age": undefined
	},
	{
	"fname": "Natalie",
	"lname": "Jazz",
	"phone": "917-111-1111",
	"email": "Nat@hotmail.com",
	"address": {
		"street": "1312 Mockingbird Lane",
		"zip": "911911",
		"country": "US"
		},
	"age": 29
	},
	{
	"fname": "Paininda",
	"lname": "Jazz",
	"phone": "917-111-1111",
	"email": "Nat@hotmail.com",
	"address": {
		"street": "1312 Mockingbird Lane",
		"zip": "911911",
		"country": "US"
		},
	"age": 29
	},
	{
	"fname": "Shmall",
	"lname": "Jazz",
	"phone": "917-111-1111",
	"email": "Nat@hotmail.com",
	"address": {
		"street": "1312 Mockingbird Lane",
		"zip": "911911",
		"country": "US"
		},
	"age": 29
	}
];