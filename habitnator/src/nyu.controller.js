var app = {};

app.initialize = function(){
	$.afui.launch();


	$("#homeview-footer-btn").text("Add Habit").on("tap", app.addHabit);

}

app.addHabit = function(){
	alert("habit added...");
}
