// Selecting all queries elements
var startButton = document.querySelector(".start-btn");
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
  "<div class="option"><span>" + questions[i].choices[0] + "</span></div>" +
  "<div class="option"><span>" + questions[i].choices[1] + "</span></div>" +
  "<div class="option"><span>" + questions[i].choices[2] + "</span></div>" +
  "<div class="option"><span>" + questions[i].choices[3] + "</span></div>" ;
  // Adding new span tag inside question tag
  questionText.innerHTML = questionTag;
  // Adding new div tag inside choice tag
  choices.innerHTML = choicesTag;

  const option = choices.querySelectorAll(".choices");
  // Set onclick attribute to all available choices
  for (i = 0; i < choices.length; i++){
    choices[i].setAttribute("onclick", "choicesSelected(this)");
  }
}

// Create function when user clicked/chosen choices
function choicesSelected(answer){
  var userAnswer = answer.textContent; // User selected answer
  var correctAnswer = questions[questionCount].answer; // Getting correct answer from array
  const allChoices = choices.children.length; // Getting all choices values

  if(userAnswer == correctAnswer){
    // If user chosen correct answer +20 points
    userScore += 20; // Adding score values 
    answer.classList.add("correct"); // Adding green color to correct option using.classList.add 
    console.log("Correct Answer");
    console.log("Your correct answer = " + userScore);
  } else {
    answer.classList.add("incorrect"); // Adding red color to correct option using.classList.add 
    console.log("Wrong Answer");
    for (i = 0; i < allChoices; i++){
      if(choices.children[i].textContent == correctAnswer){ // If there is an option which is matched to an array answer
        choices.children[i].setAttribute("class", "choice correct"); // Adding green color to macthed option
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allChoices; i++){
    // Once user select their choice then disabled all choices
    choices.children[i].classList.add("disabled"); 
  }
}



// startGame function is called when the start button is clicked
function startGame() {
  startButton.setAttribute("style", "display: none;")
  
  displayQuestion();

  
}



// Calls init() so that it fires when page opened
init();