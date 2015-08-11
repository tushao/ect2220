var app = {};

var currentQuestionSlot = 0;
var question;

app.init = function(){

	app.outputTheHtmlIntoTheHtmlPageIntoTheElement();
	app.setupButtons();
	
};

app.outputTheHtmlIntoTheHtmlPageIntoTheElement = function(){

	question = questionList[currentQuestionSlot];

	$("#question-title-output").text(question.text);

	var html = "";
	for(var you=0; you<question.choices.length; you++){
		html += '<input type="radio" name="choices" value="'+question.choices[you].correct+'"><label for="choice-'+(you+1)+'">'+question.choices[you].text+'</label>';
	}
	$("#choices-output").html(html);
}



app.setupButtons = function(){

	$("#submit-choice-btn").on('click', function(){

		var valueOfTheLabel = $("input[name=choices]:checked");
		app.submitChoice(valueOfTheLabel.val());
	});

};


app.submitChoice = function(valOfChoice){

	var resultHTML = ""
	if(valOfChoice == "true"){
		resultHTML = "<h3>CORRECT!!!</h3>";
	}else{
		resultHTML = "<h3>INCORRECT!!!</h3>";
	}

	$("#joke-result").html(resultHTML);

	currentQuestionSlot++;
	app.outputTheHtmlIntoTheHtmlPageIntoTheElement();
};


var question1 = {
	"text": "Why did the chicken cross the road?",
	"choices": [
		{
			"text": "What's a chicken?",
			"correct": false
		},
		{
			"text": "Cause..",
			"correct": true
		},
		{
			"text": "To get to the other side",
			"correct": false
		}
	]
}

var question2 = {
	"text": "Why did the elephant sit on the marshmallow?",
	"choices": [
		{
			"text": "To get a mushy tushy",
			"correct": true
		},
		{
			"text": "Weird elephant",
			"correct": false
		},
		{
			"text": "Cause....",
			"correct": false
		}
	]
}

var questionList = [question1, question2];

