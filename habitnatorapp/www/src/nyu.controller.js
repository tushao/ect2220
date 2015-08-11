/*
-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------

OVERVIEW

This nyu.controller.js file is loaded as part of the index.html content
Through the <script src=""></script> tag, the contents of this Javascript are loaded and made available

In the index.html file there is a $(document).ready function that calls app.intialize(), which is the way
the code from this file is used and first setup

This file is structured as an object called "app"
The app object is then expanded by setting properties that are functions, which can then be called
through event listners and directly through function calls

-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------


Class 9 In-Class





-----------------------------------------------------------------------------------------------------------
*/


//VARIABLE SET TO BE OBJECT
//declare a variable called "app" and set its value to be an empty object {}
var app = {};



//FUNCTION ADDED TO OBJECT
//set the property "initialize" of the "app" object to be a function
//this function can now be called using app.intialize();
//the app.intialize() function is called from the index.html $(document).ready <script>
app.initialize = function(){
	
	//$.afui is a global variable made available by the Intel app framework.
	//when we load in the AFUI library in index.html <script src="src/af.ui.js"> the library is made available
	//this call to the $.afui object launches the interface which brings up the loader, and then calls the first panel in the index.html
	$.afui.launch();

	//loading habits
	model.loadHabits();

	//call a function that adds to some of the panels, a listener so that when the panel loads it'll call a certain function
	//for example, i want this function to add a panelload handler to the "#addHabit" panel
	app.bindPanelLoaders();

	model.initialize();

	//since the first panel that will be displayed is #home, this call will be sure to populate the panel with
	//all of the habit objects pulled from the "habitList" variable declared in this file at the bottom
	//technically, we might ALSO want to call this via "panelload" event listener on #home, so everytime #home loads this function
	//also gets called and the habit list gets refreshed. maybe we'll do this later. 
	app.showHabits();
};


//FUNCTION ADDED TO OBJECT
//this function handles adding an "panelload" event listener to certain panels
app.bindPanelLoaders = function(){
	
	//find the "#addHabit" panel and add the listener  .on("panelload")
	//when that panelload event is triggered (which means the panel is loaded or called), then trigger the function call app.showAddHabit()
	//this function will then handle setting up the panel (e.g, adding any button listers or showing dynamic content)
	$("#addHabit").on("panelload", function(){
		//call the function app.showAddHabit() which handles making sure the "add" button works
		app.showAddHabit(); 
	});

	$("#habitDetail").on("panelload", function(){
		app.showHabitDetail();
	})

	$("#home").on("panelload", function(){
		app.showHabits();
	});

}


app.processAddHabit = function(){

	//step 1 - declare THREE variables, one for each of the values we will pull from the form elements

		//for instance habitTitle will first ask jQuery to find the element with id="addHabit-title", which is an <input> element
		//since it is an <input> element, we can ask for it's "value" which will be what the user typed in the text field
		var habitTitle = $("#addHabit-title").val();

		//this second variable is a little different since it's not a textfield, but a "drop-down" (ie. <select> tag)
		//what this jQuery is saying is... find the DOM element with ID "addHabit-type", which is a <select> tag
		//BUT it is also asking for the "option:selected", which means we don't just want the DOM element "addHabit-type"
		//we also want the sub element <option>... specifically the one that the user has selected.
		//this is considered a form of CSS selectors that combine two things. First it wants "#addHabit-type", and second it wants "option:selected"
		//for more info on CSS selectors check out: https://css-tricks.com/how-css-selectors-work/
		var habitType = $("#addHabit-type option:selected").val();

		//this is the third variable. it will pull again from an <input> tag so we just use .val() which asks for the textfield value
		var habitTarget = $("#addHabit-target").val();
		var habitStarted = moment();

		//step 2 - validate some of the values.

		//this is a "if/then conditional" which means it will check for a relationship, and if true will execute code
		//for example here, we are checking if variable "habitTitle" is equal (==) to empty (""). 
		//why? because if the user left the title empty, we want to tell them they shouldn't. we do this via an alert box.
		//why do we use two equals signs instead of one? because one equal sign is interpreted as setting instead of checkin
		//in other words habitTitle = "" is SETTING the variable to empty, while habitTitle == "" is CHECKING if it's empty.
		//lastly, the "return" makes sure the function no longer keeps executing. it basically says...
		//stop here and go back to whoever called the function (ie. assume the function has ended)
		if(habitTitle == ""){
			alert("HEY I NEED YOU TO TAKE THIS SERIOUSLY!!!! CMON MAN!!");
			return;
		}

		//step 3 - create the habit object and set its properties

		//create a variable and set it to be an empty object that we will eventually push to the habitList array
		//this object will be what we use to hold all the variables we just created and set to be the form element values .val()
		var habitObj = {};

		//now we need to add a property to this object and set it to be one of the three variables we created earlier
		//here we create a property "title" in this object "habitObj" to be equal to the variable "habitTitle"
		habitObj.title = habitTitle;
		habitObj.type = habitType;
		habitObj.started = habitStarted;
		habitObj.target = habitTarget;
		habitObj.unit = "instance";
		habitObj.log = []; 

		/*
		REMEMBER: We are trying to build objects that look like the DUMMY data we created and are using to loop through
		This is a habit object that when we get when we loop through habitList:

		habitObj = {
			"title": "Smoke less",
			"started": "07-15-2015",
			"type": "decrease",
			"target": "",
			"log": []
		}

		Technically, we would create such an object using code like this... 
		var habitObj = {};
		habitObj.title = "Smoke less"
		habitObj.started = "07-15-2015"
		habitObj.type = "decrease";
		habitObj.target = "";
		habitObj.log = [];
		*/
		
		//step 4 - add the habit object to our existing list of habit objects (habitList)

		//once we're done creating our habit object "habitObj" we can then add that object to our existing array of habit objects
		//our existing array of habit objects is called "habitList" and was created in this file down below as hard-coded DUMMY data
		model.processAddHabit(habitObj);

		//****************************
		//WHAT'S NEXT? FOR HOMEWORK:
		//finish adding the other properties to the habitObj (eg. type and target which you pulled form html form elements before)
		//after added to habitList array (push) go back to the home panel AND refresh the list of habits so that the one we just added gets shown....
		//****************************

		//calling our internal app function to go to panel #home
		app.go("#home");

};


//FUNCTION ADDED TO OBJECT
//this function is called whenever the #addHabit panel gets loaded (ie. the "panelload" event is fired which triggers the function call
app.showAddHabit = function(){

	//find the #addHabit-action element (which is a button), and when it is "click" execute all of the code that will grab the form element values
	//when we add the .on make sure to turn off any existing handlers with .off()
	//why? this function may have been called before, and if so, there might already be a .on("click"), so we need to .off() first, and then .on again
	//this way we avoid multiple .on(click) calls being made.....
	$("#addHabit-action").off();
	$("#addHabit-action").on("click", function(){
		console.log("APP: Add habit button was called....");

		app.processAddHabit();
	});

	$("#addHabit-title").val('');
};


//FUNCTION ADDED TO OBJECT
//this function gets called in the app.initialize() function and handles looping through the DUMMY data variable "habitList"
//"habitList" is manually created in this file below
app.showHabits = function(){
	console.log("APP: showHabits() called...");

	//step 1 - loop through the variable "habitList" which is an array [] of several habit objects
	//down below when we created habitList = [] and put several {} objects inside of it, it means that habitList is an "array of objects"
	//by looping through the habitList, we are basically accessing habitList[0]... [1]...[2], which EACH represent a habit object {}
	//in other words habitList[0] is actually our first habit object {"title":"Smoke less"} get it?
	
	//first we create a variable to hold the first part of the html we're going to eventually display to element #habitList
	var htmlOutput = "<ul class='list'>";

	//now we loop through the habitList array, and at each iteration, add to our html variable "htmlOutput"
	for(var x=0; x<model.habitList.length; x++){

		//add to the HTML variable that creates the <li> tag and be sure to dynamically display the title and type
		//at this point, we are INSIDE the for loop, and so habitList[x] is actually equal to the habit object in slot x
		//this means that to access the title property of the habit object, we can use habitList[x].title
		//lastly, we are also creating an attribute "data-id" and setting it to the slot "x" so when we click on the <li>
		//we will be able to pull the "data-id" attribute and know which habit item we clicked on... 

		var typeClass = "";	//either going to be increaseHabitClass or a decreaseHabitClass
		if(model.habitList[x].type == "increase"){
			typeClass = "increaseHabitClass";
		}else{
			typeClass = "decreaseHabitClass";
		}

		//htmlOutput += "<li class='habit-item "+typeClass+"' data-id='"+x+"'><h1>" + model.habitList[x].title + "</h1> (" + model.habitList[x].type + ")" + "</li>";
		htmlOutput += "<li class='habit-item "+typeClass+"' data-id='"+x+"'><a href='#'><h1>" + model.habitList[x].title + "</h1> (" + model.habitList[x].type + ")" + "</a></li>";
	}

	//we are now outside of the loop and we can finish our html by ending the <ul> tag that contains all of our <li> items
	//<ul> = unorder list and <li> = list item
	htmlOutput += "</ul>";


	if(model.isHabitListEmpty() == true){
		htmlOutput = "No habits....";
	}

	//with the htmlOutput variable finished, we can now have it displayed. we do this by setting the html of element "#habitList"
	//equal to the "htmlOutput" variable
	$("#habitList").html(htmlOutput);


	//step 2 - we now need to activate the <li> tags so when they are clicked on.. something happens. we do this by...
	//finding ALL elements that have class="habit-item" and setting them to respond to the event "click"
	//remember that in step 1, while we looped through "habitList" and created the <li> items, we set their class to be "habit-item"

	//here we add an event listner and grab the "click" event as a parameter from which we will extract the data-id attribute
	//remember that we dynamically assigned the "data-id" to be equal to the array slot "x" value within the <li> html tag
	$(".habit-item").on("click", function(event){

		//now that the #habitDetail page is loaded, we need to make sure the actual information for the habit object selected is displayed
		//first we need to know... which habit was clicked on? we do this by grabbing the value "data-id" from the <li> tag
		//we can do this different ways.... 
		//var habitID = event.currentTarget.getAttribute('data-id');
		//var habitID = $(this).data("id");
		var habitID = $(event.currentTarget).data("id");

		//save this habit ID so we don't have to do this painful coding thing again....
		model.setCurrentHabitObj(model.getHabitByID(habitID));

		//change the page to panel #habitDetail
		//we are using the built-in $.afui function called "loadContent" which takes in the id (#habitDetail) of panel to load
		$.afui.loadContent("#habitDetail",false,false,"up");
	});
};


//FUNCTION ADDED TO OBJECT
//this function handles creating the HTML of all of a habit object's properties
//it knows which slot to access the habit object because the id is equal to the slot value
//in other words "habitList[id]" is either [0], [1], [2]... and it equals an actual habit object {} with properties .title .type, etc.
app.showHabitDetail = function(){

	//step 1 - access the habit object from the "habitList" array using the "id" value as the array slot number
	var habitObj = model.getCurrentHabitObj();
	console.log("--------------------------------------");
	console.log("HabitObj:");
	console.log(habitObj);

	//generate the HTML output for today
	var htmlToday = app.generateHabitDetailToday(habitObj);
	$("#habitDetail-today").html(htmlToday);

	//populate the weekly canvas item
	app.generateHabitDetailWeekly(habitObj);

	//step 4 - add event handler to our +++ add button so that it adds a log to the current habit object
	$("#habitDetail-addLog-action").off().on("click", function(){
		console.log("APP: Add log button was clicked on");

		//call the function addHabitLog()
		app.addHabitLog();

	});

};

app.generateHabitDetailWeekly = function(habitObj){

	console.log("-----------------------------------");

	//have moment objects for each day we want to play with
	var dToday = moment();
	var dSun = moment().day(0);
	var dMon = moment().day(1);
	var dTues = moment().day(2);
	var dWed = moment().day(3);
	var dThurs = moment().day(4);
	var dFri = moment().day(5);
	var dSat = moment().day(6);

	//setup the variables to hold info for each day
	var dSunData = [];
	var dMonData = [];
	var dTuesData = [];
	var dWedData = [];
	var dThursData = [];
	var dFriData = [];
	var dSatData = [];

	//replace our code with dummy data
	habitObj.log = app.generateDummyWeeklyLogData();


	//loop through the log items looking for a match for a particular day....
	for(var i=0; i<habitObj.log.length; i++){

		var habitDate = moment(habitObj.log[i].date);

		if(habitDate.isSame(dSun,'day')){
			dSunData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dMon,'day')){
			dMonData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dTues,'day')){
			dTuesData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dWed,'day')){
			dWedData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dThurs,'day')){
			dThursData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dFri,'day')){
			dFriData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dSat,'day')){
			dSatData.push(habitObj.log[i])	
		}
	}

	//set colors
	var barColor = "#cccccc";
	var barColorFail = "#FF5252";


	//output the actual frequency data to be used in chart from the array lengths
	var weeklyData = [dSunData.length, dMonData.length, dTuesData.length, dWedData.length, dThursData.length, dFriData.length, dSatData.length];

	//output chart
	var ctx = $("#weeklyChart").get(0).getContext("2d");
	
	var data = {
	    labels: ["Su", "M", "T", "W", "Th", "F", "Sa"],
	    datasets: [
	        {
	            label: "My First dataset",
	            fillColor: barColor,
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: barColor,
	            highlightStroke: "rgba(220,220,220,1)",
	            data: weeklyData
	        }
	    ]
	};
	var options = {};
	var myBarChart = new Chart(ctx).Bar(data, options);


	//update the dataset based on target
	for(var t=0; t<data.datasets[0].data.length; t++){
		var dataSlot = data.datasets[0].data[t];

		if(habitObj.type == "increase"){
			if(dataSlot < habitObj.target){
				myBarChart.datasets[0].bars[t].fillColor = barColorFail;
				myBarChart.datasets[0].bars[t].highlightFill = barColorFail;
			}
		}else{
			if(dataSlot > habitObj.target){
				myBarChart.datasets[0].bars[t].fillColor = barColorFail;
				myBarChart.datasets[0].bars[t].highlightFill = barColorFail;
			}
		}
		
	}


	//output the target so the user knows what their goal was...
	$("#weeklyChart-target").text(habitObj.target);

};


app.generateDummyWeeklyLogData = function(){

	var weeklyLogArray = [];

	weeklyLogArray.push({"date":moment().subtract(1, 'day')});
	weeklyLogArray.push({"date":moment().subtract(2, 'day')});
	weeklyLogArray.push({"date":moment().subtract(3, 'day')});
	weeklyLogArray.push({"date":moment().subtract(3, 'day')});
	weeklyLogArray.push({"date":moment().subtract(4, 'day')});

	weeklyLogArray.push({"date":moment().add(2, 'day')});
	weeklyLogArray.push({"date":moment().add(2, 'day')});
	weeklyLogArray.push({"date":moment().add(2, 'day')});

	return weeklyLogArray;

};


app.generateHabitDetailToday = function(habitObj){
	//step 2 - calculate the today metric and output it
	//if it's decrease then I want log to be less than or equal to target
	//if it's increase then I want log length to be greater or equal to target 

	//today habit length
	//numbet of objects in log array whose date matches today's date
		//loop through all of the log items in the current habit object
			//check to see if the habit.date is equal to today's date 
	var todaysDate = moment();
	var todayHabitLength = 0;
	var targetHabitLength = habitObj.target;

	console.log("TODAY's Date: " + todaysDate.format('M-D-YY'));
	console.log("LOG ITEMS: " + habitObj.log.length);

	for(var x=0; x<habitObj.log.length; x++){
		var isLogToday = moment(habitObj.log[x].date).isSame(todaysDate, 'day');
		console.log("LOG DATE: " + moment(habitObj.log.date).format('M-D-YY'));
		console.log("IS THIS IS MATCH FOR TODAY?? " + isLogToday);
		if(isLogToday == true){
			todayHabitLength++;
		}
	}	
	
	//if it's on target output positive image
	//if it's not on target a neagtive image
	//also as a note output log.length / target
	console.log("TARGET FOR HABIT: " + targetHabitLength);
	var iconPositive = "<img class='card-icon' src='build/images/thumbsup.png' />";
	var iconNegative = "<img class='card-icon' src='build/images/thumbsdown.png' />";
	var htmlToday = "<div class='card-header'>TODAY</div>";

	switch(habitObj.type){

		case "increase":
			if(todayHabitLength >= targetHabitLength){
				htmlToday += iconPositive;
			}else{
				htmlToday += iconNegative;
			}
			break;

		case "decrease":
			if(todayHabitLength <= targetHabitLength){
				htmlToday += iconPositive;
			}else{
				htmlToday += iconNegative;
			}
			break;
	}
	
	htmlToday += "<div class='card-subheader'>(" + todayHabitLength + "/" + targetHabitLength + ")</div>"

	return htmlToday;
};





app.addHabitLog = function(){
	console.log("APP: addHabitLog called...");

	//use the saved habitID to grab the habit object from the habitList array
	var habitObj = model.getCurrentHabitObj();

	//create temp object
	var tempLogObj = {};

	//populate obj with crap
	tempLogObj.date = moment();
	tempLogObj.amount = 1;
	tempLogObj.note = "";

	//add temp log obj to the habit obj log array
	model.processAddHabitLog(tempLogObj);

	//refresh the display
	//app.go("#home");
	app.showHabitDetail(app.selectedHabitID);
};

 

app.go = function(panelid){
	$.afui.loadContent(panelid, null, null, "none");
};









