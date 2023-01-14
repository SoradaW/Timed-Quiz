// Selecting all queries elements
var startButton = document.querySelector("#start");
var infoBox = document.querySelector(".info-box");
var quizBox = document.querySelector(".quiz-box");
var resultBox = document.querySelector(".result-box");
var choices = document.querySelector(".choices");
var timeText = document.querySelector(".timer .time-text");
var timeCount = document.querySelector(".timer .timer-sec");

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

var questionCount = 0;
var timerValue = 30;
var qNum = 1;
var userScore = 0;

// Getting questions and choices for array
function displayQuestion(i) {
  const questionText = document.querySelector(".question-text")
  // Creaing a new span and div tags for questions and choices and passing the value using array index
  var questionTag = "<span>" + questionsArr[i].qNum + questionsArr[i].question + "</span>";
  var choicesTag = 
  "<div class="option"><span>" + questions[i].options[0] + "</span></div>" +
  "<div class="option"><span>" + questions[i].options[1] + "</span></div>" +
  "<div class="option"><span>" + questions[i].options[2] + "</span></div>" +
  "<div class="option"><span>" + questions[i].options[3] + "</span></div>" ;
  // Adding new span tag inside question tag
  questionText.innerHTML = questionTag;
  // Adding new div tag inside choice tag
  choices.innerHTML = choicesTag;

  const option = choices.querySelectorAll(".choices");
  // Set onclick attribute to all available options
  for (i = 0; i < choices.clientHeight; i++){
    choices[i].setAttribute("onclick", "choicesSelected(this)");
  }
}




// startGame function is called when the start button is clicked
function startGame() {
  startButton.setAttribute("style", "display: none;")
  
  displayQuestion();

  
}



// Calls init() so that it fires when page opened
init();