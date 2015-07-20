var app = {};

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


app.initialize = function(){
	$.afui.launch();
	app.populateHabits();
};

app.populateHabits = function(){

	var htmlOutput = "";

	//open up the <ul>
	htmlOutput = "<ul class='list'>";

	//loop through the badboy
	for(var x=0; x<habitList.length; x++){
		htmlOutput += "<li class='swipe-reveal'>";
		htmlOutput += "<a>" + habitList[x].title + "</a>";
		htmlOutput += "</li>";
	}
	

	/*
	<li class="swipe-reveal">
	    <div class="swipe-content">Dining outside</div>
	    <div class="swipe-hidden">
	        <a class="button archive" onclick="$(this).closest('.swipe-reveal').remove()">Delete</a>
	    </div>
	</li>
	*/


	htmlOutput += "</ul>";


	$("#habitList").html(htmlOutput);


};


