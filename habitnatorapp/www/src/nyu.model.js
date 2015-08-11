var model = {
	habitList: [],
	currentHabitObj: {}
};

model.initialize = function(){
	console.log("MODEL: Initialize() called..");

	model.createUser(function(){

		var promise = Kinvey.init({
	        appKey    : 'kid_-JFY3oaUEx',
	        appSecret : '50b068dc903b4dd4acd0362687c048e8'
	    });
	    promise.then(function(activeUser) {
	        alert('success with kinvey!!!');
	    }, function(error) {
	        alert("error has occurred!");
	    });

	});

};

model.createUser = function(callback){

	var promise = Kinvey.User.signup({
    	username : 'ralph',
    	password : 'ralph'
	});
	promise.then(function(user) {
	    callback();
	}, function(error) {
	    alert('error creating user');
	});

};



model.loadHabits = function(){
	model.habitList = localStorage.getItem("habitList");
	if(model.habitList == "" || model.habitList == undefined){
		model.habitList = [];
	}else{
		model.habitList = jQuery.parseJSON(model.habitList);
	}
	return model.habitList;
};



model.saveHabit = function(habitObj){
	
	var promise = Kinvey.DataStore.save('habits', habitObj);
	promise.then(function(entity) {
	    alert('habit saved...');
	}, function(error) {
	    alert('whoopsie!!!');
	    console.log(error);
	});

};

model.processAddHabit = function(habitObj){
	model.habitList.push(habitObj);
	model.saveHabit(habitObj);
};

model.getHabitByID = function(habitID){
	return model.habitList[habitID];
};

model.setCurrentHabitObj = function(habitObj){
	model.currentHabitObj = habitObj;
};

model.getCurrentHabitObj = function(){
	return model.currentHabitObj;
};

model.isHabitListEmpty = function(){
	if(model.habitList.length == 0){
		return true;
	}else{
		return false;
	}
};

model.processAddHabitLog = function(logObj){
	model.currentHabitObj.log.push(logObj);
	model.saveHabits();
};





