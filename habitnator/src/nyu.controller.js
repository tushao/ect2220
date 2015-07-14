var app = {};

app.initialize = function(){
	$.afui.launch();


	$("#homeview-footer-btn").text("Add Habit").on("tap", app.addHabit);

}

app.addHabit = function(){
	alert("habit added...");
}



/*




function - dsdsd
find the button

reset the var

set the text
set the on tap 
call the other function


*/
