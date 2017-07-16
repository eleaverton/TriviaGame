var timerRunning = false;
var setIntervalId;
var timer = {
    time: 20,
    reset: function() {
        timer.time = 20;
        $("#timer").html("Timer Remaining: " + timer.time + " seconds");
    },
    start: function() {
        if (!timerRunning) {
            setIntervalId = setInterval(timer.count, 1000);
            timerRunning = true;
        }
    },
    stop: function() {
        clearInterval(setIntervalId);
        timerRunning = false;
    },
    count: function() {
        timer.time--;
        $("#timer").html("Timer Remaining: " + timer.time + " seconds");
    }
};
var currentQuestion = 0;
var guessId;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionList = [{
    question: "At what address did Harry grow up?",
    answers: ["11 Little Whinging", "560 Clerkenwell Road", "4 Privet Drive", "1000 Hogwarts Boulevard"],
    correctAnswer: 2,
    gif: "privetdrive"
}, {
    question: "Voldemort took over the body of what Hogwarts Professor?",
    answers: ["Quirinus Quirrell", "Dolores Umbridge", "Minerva McGonnagal", "Severus Snape"],
    correctAnswer: 0,
    gif: "quirrell"
}, {
    question: "What is the language of serpents that Harry Potter can speak?",
    answers: ["Slytherin", "Slange", "Parseltongue", "Reptilish"],
    correctAnswer: 2,
    gif: "parseltongue"
}, {
    question: "What dragon does Harry fight in the Triwizard Tournament?",
    answers: ["Welsh Green", "Hungrian Horntail", "Swedish Short-Snout", "Chinese Fireball"],
    correctAnswer: 1,
    gif: "hungarian"
}];
var outOfTime = function(){
		timer.stop();
		clearTimeout(outOfTime);
        $("#questionText").empty();
        $("#answerchoices").empty();
        $("#answerverdict").html("You ran out of time!");
        $("#correctanswer").html("The correct answer is " + questionList[currentQuestion - 1].answers[questionList[currentQuestion - 1].correctAnswer] + "!");
        $("#answergif").html("<img src =  assets/images/" + questionList[currentQuestion - 1].gif + ".gif>");
        unanswered++;
        setTimeout(nextQuestion, 6000);
};

var endStats = function(){
	timer.stop();
	clearTimeout(nextQuestion);
	clearTimeout(outOfTime);
	$("#questionText").empty();
    $("#answerchoices").empty();
    $("#correctanswer").empty();
    $("#answergif").empty();
    $("#answerverdict").html("<h1>Results</h1><br>Correct: "+correct+"<br>Incorrect: "+incorrect+"<br>Unanswered: "+unanswered)
}

var nextQuestion = function() {
        timer.reset();
        timer.start();
        setTimeout(outOfTime,20000);
        currentQuestion++;
        console.log(currentQuestion);
        console.log(questionList.length);
        if (currentQuestion > (questionList.length)){
        	endStats();
        }
        else{
	        console.log(currentQuestion);
	        $("#startbutton").empty();
	        $("#answerverdict").empty();
	        $("#correctanswer").empty();
	        $("#answergif").empty();
	        $("#questionText").html("<h2>" + questionList[currentQuestion - 1].question + "</h2>");
	        for (i = 0; i < 4; i++) {
	            $("#answerchoices").append("<li id =" + i + ">" + questionList[currentQuestion - 1].answers[i] + "</li>");
	        };
    }	

    };

$("#start").on("click", nextQuestion);

$("#answerchoices").click(function(e) {
    e.stopPropagation();
    console.log(e.target.id);
    guessId = parseInt(e.target.id);
    console.log(guessId);
    timer.stop();
    clearTimeout(outOfTime);
    if (guessId === questionList[currentQuestion - 1].correctAnswer) {
        $("#questionText").empty();
        $("#answerchoices").empty();
        $("#answerverdict").html("You are correct!");
        $("#answergif").html("<img src =  assets/images/" + questionList[currentQuestion - 1].gif + ".gif>");
        correct++;
        setTimeout(nextQuestion, 6000);
    } else if (guessId !== questionList[currentQuestion - 1].correctAnswer) {
        $("#questionText").empty();
        $("#answerchoices").empty();
        $("#answerverdict").html("That is incorrect!");
        $("#correctanswer").html("The correct answer is " + questionList[currentQuestion - 1].answers[questionList[currentQuestion - 1].correctAnswer] + "!");
        $("#answergif").html("<img src =  assets/images/" + questionList[currentQuestion - 1].gif + ".gif>");
        incorrect++;
        setTimeout(nextQuestion, 6000);
    }


});
