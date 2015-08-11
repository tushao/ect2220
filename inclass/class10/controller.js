
var app = {};




app.init = function(){
	console.log("App is initialized...");
	
	//we are getting the 2D space where we can put stuff on the canvas....
	var ctx = $("#myChart").get(0).getContext("2d");
	


	var data = {
	    labels: ["Su", "M", "T", "W", "Th", "F", "Sa"],
	    datasets: [
	        {
	            label: "My First dataset",
	            fillColor: "rgba(220,220,220,0.5)",
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke: "rgba(220,220,220,1)",
	            data: [4, 1, 1, 1, 2, 3, 5]
	        }
	    ]
	};

	var options = {};

	//this is actually creating the bar chart
	var myBarChart = new Chart(ctx).Bar(data, options);


};







