var app = {}

app.init = function(){

	var remoteDataURL = "http://api.kivaws.org/v1/loans/newest.json";

	var nytimesURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=bushwick&api-key=117eaf3da04f6f55d9106d059f7e3cd7%3A1%3A72654272";


	$.getJSON(nytimesURL, function(data) {
		//app.showLoans(data);
		app.showArticles(data);
	});

};

app.showArticles = function(data){

	var htmlOutput = "";

	

	for(var i=0; i<data.response.docs.length; i++){
		var articleObj = data.response.docs[i];

		htmlOutput += '<div class="panel panel-default">';
  		htmlOutput += '<div class="panel-body">';


		htmlOutput += "<p class='lead'>"+articleObj.abstract+"</p>";
		htmlOutput += "<a href='"+articleObj.web_url+"'>More</a>";

		htmlOutput += "</div></div>";
	}
	

	$("#loans-output").html(htmlOutput);

};


app.showLoans = function(loanData){
	console.log("Showing loans...");

	var htmlOutput = "";

	for(var i=0; i<loanData.loans.length; i++){
		var loanObj = loanData.loans[i];

		htmlOutput += "<h2>"+loanObj.name+"</h2>";
		htmlOutput += loanObj.use;
	}

	$("#loans-output").html(htmlOutput);
}