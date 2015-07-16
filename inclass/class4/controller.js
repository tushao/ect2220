
var app = {};


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






app.init = function(){
	console.log("App is initialized...");


	app.showPeople();
};

app.showPeople = function(filter){

	//dynamically create html to out person information
	var htmlOutput = "";
	for(var x=0; x<peopleListLarge.length; x++){

		if(peopleListLarge[x].fname == filter){

			htmlOutput = htmlOutput + "<div>First Name: " + peopleListLarge[x].fname + "</div>";
			htmlOutput = htmlOutput + "<div>Last Name: " + peopleListLarge[x].lname + "</div>"; 
			htmlOutput = htmlOutput + "<div>Phone: " + peopleListLarge[x].phone + "</div>"; 

		}
	}

	$("#peopleList-output").html(htmlOutput);

}

//-----------------------------------








