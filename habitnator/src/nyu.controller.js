var app = {};

app.initialize = function(){
	$.afui.launch();
	app.setupIntro();
};

app.setupIntro = function(){

	$('.intro-screen').hide();
	$("#intro-screen-1").show();

	//$("#intro-screen-1").click(function(){
	$("#intro-screen-1").on("swipe", function(){
		$("#intro-screen-2").show();
		$("#intro-screen-1").hide();
	});

	$("#intro-screen-2").on("swipe", function(){
		$("#intro-screen-3").show();
		$("#intro-screen-2").hide();
	});

	$("#intro-screen-3").on("swipe", function(){
		alert('done');
		$("#intro-screen-3").hide();
	});
};