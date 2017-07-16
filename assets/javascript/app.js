//set up timer variables and objects
var timerRunning = false;
var setIntervalId;
var questionTimeout;
var answerTimeout;
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
//set up question variables and objects
var currentQuestion = 0;
var guessId;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionList = [{
    question: "At vhat address did Harry grov up?",
    answers: ["11 Little Whinging", "560 Clerkenwell Road", "4 Privet Drive", "1000 Hogwarts Boulevard"],
    correctAnswer: 2,
    gif: "privetdrive"
}, {
    question: "Woldemort took over the body of what Hogvarts Professor?",
    answers: ["Quirinus Quirrell", "Dolores Umbridge", "Minerva McGonnagal", "Severus Snape"],
    correctAnswer: 0,
    gif: "quirrell"
}, {
    question: "Vhat is the language of serpents that Harry Potter can speak?",
    answers: ["Slytherin", "Slange", "Parseltongue", "Reptilish"],
    correctAnswer: 2,
    gif: "parseltongue"
}, {
    question: "Vhat dragon does Harry fight in the Trivizard Tournament?",
    answers: ["Welsh Green", "Hungrian Horntail", "Swedish Short-Snout", "Chinese Fireball"],
    correctAnswer: 1,
    gif: "hungarian"
}];
//this function indicates that the question has not been answered and then moves on to next question using answerTimeout
//it is called from a Timeout function (questionTimeout)
var outOfTime = function(){
		clearTimeout(questionTimeout);
		timer.stop();
        $("#questionText").empty();
        $("#answerchoices").empty();
        $("#answerverdict").html("You ran out of time!");
        $("#correctanswer").html("The correct answer is " + questionList[currentQuestion - 1].answers[questionList[currentQuestion - 1].correctAnswer] + "!");
        $("#answergif").html("<img src =  assets/images/" + questionList[currentQuestion - 1].gif + ".gif>");
        unanswered++;
        answerTimeout = setTimeout(nextQuestion, 6000);
};

//this function displays how many questions were correct, incorrect, and unanswered
var endStats = function(){
	timer.stop();
	clearTimeout(answerTimeout);

	$("#questionText").empty();
    $("#answerchoices").empty();
    $("#correctanswer").empty();
    $("#answergif").empty();
    $("#answerverdict").html("<h1>Results</h1><br>Correct: "+correct+"<br>Incorrect: "+incorrect+"<br>Unanswered: "+unanswered)
}
//this function resets and starts the timer and sets up the next question and answer options
var nextQuestion = function() {
        timer.reset();
        timer.start();
        console.log(currentQuestion);
        console.log(questionList.length);
        currentQuestion++;
        //if the curretQuestion counter exceeds the number of questions, execute endStats
        if (currentQuestion > (questionList.length)){
        	endStats();
        }
        //else if currentQuestion is within limits, set up the next question
        else if(currentQuestion <= (questionList.length)){
        	questionTimeout = setTimeout(outOfTime,20000);
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

//when an answer is selected, the quesitonTimeout should clear.
$("#answerchoices").click(function(e) {
    e.stopPropagation();
    console.log(e.target.id);
    guessId = parseInt(e.target.id);
    console.log(guessId);
    timer.stop();
    clearTimeout(questionTimeout);
    if (guessId === questionList[currentQuestion - 1].correctAnswer) {
        $("#questionText").empty();
        $("#answerchoices").empty();
        $("#answerverdict").html("You are correct!");
        $("#answergif").html("<img src =  assets/images/" + questionList[currentQuestion - 1].gif + ".gif>");
        correct++;
        answerTimeout = setTimeout(nextQuestion, 6000);
    } else if (guessId !== questionList[currentQuestion - 1].correctAnswer) {
        $("#questionText").empty();
        $("#answerchoices").empty();
        $("#answerverdict").html("That is incorrect!");
        $("#correctanswer").html("The correct answer is " + questionList[currentQuestion - 1].answers[questionList[currentQuestion - 1].correctAnswer] + "!");
        $("#answergif").html("<img src =  assets/images/" + questionList[currentQuestion - 1].gif + ".gif>");
        incorrect++;
        answerTimeout = setTimeout(nextQuestion, 6000);
    }


});
