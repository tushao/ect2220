var app = {};


var sampleArray = [];	//declares variable array empty


app.init = "ralph";





app.init = function(){
	console.log("App is initialized...");

	//call a function and set the variable equal to whatever is returned
	sampleArray = app.generateArrayData();

	//output to console the entire array as an object
	console.log(sampleArray);

	//call a function to output array contents to console log
	app.displayArrayData();

	//add one more item to the array
	sampleArray.push('slot6');

	//display again to see the new item was added
	app.displayArrayData();
};


app.generateArrayData = function(){
	return ['slot1', 'slot2', 'slot3','slot4','slot5'];
};


app.displayArrayData = function(){
	console.log("------------ Displaying Array Data -----------");

	//loop through array
	for(var i=0; i<sampleArray.length; i++){
		console.log("sampleArray["+i+"] is equal to '"+sampleArray[i]+"'");	
	}
};
