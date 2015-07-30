var model = {

	habitList: [],
	currentHabitObj: {}

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



model.saveHabits = function(){
	localStorage.setItem("habitList", JSON.stringify(model.habitList));
};

model.processAddHabit = function(habitObj){
	model.habitList.push(habitObj);
	model.saveHabits();
};

model.getHabitByID = function(habitID){
	return model.habitList[habitID];
};

model.setCurrentHabitObj = function(habitObj){
	model.currentHabitObj = habitObj;
}

model.getCurrentHabitObj = function(){
	return model.currentHabitObj;
}

model.isHabitListEmpty = function(){
	if(model.habitList.length == 0){
		return true;
	}else{
		return false;
	}
}

model.processAddHabitLog = function(logObj){
	model.currentHabitObj.log.push(logObj);
	model.saveHabits();
};




