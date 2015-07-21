var app = {};

app.initialize = function(){
	$.afui.launch();

	app.showHabits();
};

app.showHabits = function(){

	console.log("APP: showHabits() called...");

	var htmlOutput = "<ul class='list'>";
	for(var x=0; x<habitList.length; x++){
		htmlOutput += "<li><h1>" + habitList[x].title + "</h1> (" + habitList[x].type + ")" + "</li>";
	}
	htmlOutput += "</ul>";

	//display the html
	$("#habitList").html(htmlOutput);
};


/*
	<li class="swipe-reveal">
	    <div class="swipe-content">Dining outside</div>
	    <div class="swipe-hidden">
	        <a class="button archive" onclick="$(this).closest('.swipe-reveal').remove()">Delete</a>
	    </div>
	</li>
	*/



var habitList = [
	{
		"title": "Smoke less",
		"started": "07-15-2015",
		"type": "decrease",
		"target": 1,
		"unit": "session",
		"log": [
			{
				"date": "07-15-2015",
				"amount": 1,
				"note": ""
			},
			{
				"date": "07-16-2015",
				"amount": 1,
				"note": ""
			}
		]
	},
	{
		"title": "Dining outside",
		"started": "07-14-2015",
		"type": "decrease",
		"target": 1,
		"unit": "outing",
		"log": [
			{
				"date": "07-16-2015",
				"amount": 1,
				"note": ""
			},
			{
				"date": "07-14-2015",
				"amount": 1,
				"note": ""
			}
		]
	},
	{
		"title": "Exercise",
		"started": "07-12-2015",
		"type": "increase",
		"target": 1,
		"unit": "session",
		"log": [
			{
				"date": "07-12-2015",
				"amount": 1,
				"note": ""
			},
			{
				"date": "07-15-2015",
				"amount": 1,
				"note": ""
			}
		]
	}
];