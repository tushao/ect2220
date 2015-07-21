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


AFTER CLASS UPDATED.....

*/


var app = {};

app.initialize = function(){
	$.afui.launch();
	app.showIntro(1);

	$("#home").on("panelload", function(){
		app.showPeople();
	});

	//NOTE: REMOVE ME!!!!!
	app.showPeople();
};

app.showIntro = function(screenNumber){
	console.log("APP: showIntro called....");

	if(screenNumber == 1){
		$("#intro-screen-1").show();
		$("#intro-screen-2").hide();
		$("#intro-screen-3").hide();
		$("#intro-screen-1").on("swipe", function(){
			app.showIntro(2);
		});
	}

	if(screenNumber == 2){
		$("#intro-screen-2").show();
		$("#intro-screen-1").hide();
		$("#intro-screen-3").hide();
		$("#intro-screen-2").on("swipe", function(){
			app.showIntro(3);
		});
	}

	if(screenNumber == 3){
		$("#intro-screen-3").show();
		$("#intro-screen-1").hide();
		$("#intro-screen-2").hide();
		$("#intro-screen-3").on("swipe", function(){
			app.showIntro(4);
		});
	}

	if(screenNumber == 4){
		$.afui.loadContent("#home",false,false,"up");
	}
};

app.showPeople = function(filter){
	console.log("APP: showPeople was called...");

	//dynamically create html to out person information
	var htmlOutput = "<ul class='list'>";
	for(var x=0; x<peopleListLarge.length; x++){

			htmlOutput += "<li class='people-item' data-id='"+x+"'>";
			htmlOutput += peopleListLarge[x].fname + " " + peopleListLarge[x].lname;
			htmlOutput += "</li>";

	}
	htmlOutput += "</ul>";

	//outputting the HTML that I created as a variable called htmlOutput
	$("#peopleList-output").html(htmlOutput);

	//adding an event listner and grabbing event as a parameter from which I will extract the data-id attribute that I dynamically assigned to the <li> html tag
	$(".people-item").on("click", function(event){
		
		//change the page to panel #habitDetail
		$.afui.loadContent("#habitDetail",false,false,"up");

		//populate the details by sending the peopleID (from the <li> data-id attribute) to the showPeopleDetail function
		var peopleID = event.target.getAttribute('data-id');
		app.showPeopleDetail(peopleID);
	});
};

app.showPeopleDetail = function(somethingUnique){

	var peopleObj = peopleListLarge[somethingUnique];
	console.log(somethingUnique);

	var htmlOutput = "";
	htmlOutput += "<h1>" + peopleObj.fname + " " + peopleObj.lname + "</h1>";
	htmlOutput += "<div class='people-item-property'>Phone: " + peopleObj.phone + "</div>";
	htmlOutput += "<div class='people-item-property'>Age: " + peopleObj.age + "</div>";

	$("#peopleDetail-output").html(htmlOutput);
};



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